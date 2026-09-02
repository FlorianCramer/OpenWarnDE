import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserRole } from "@/types/user";

export type PlatformUserData = {
  uid: string;
  email: string;
  displayName: string | null;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  disabled?: boolean;
};

export type CreateUserData = {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
};

export type UpdateUserData = {
  email?: string;
  password?: string;
  displayName?: string | null;
  role?: UserRole;
  disabled?: boolean;
};

// ─── Firebase Auth REST API (client-side, uses public API key) ───────────────────

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const AUTH_BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;

interface AuthApiError {
  error?: {
    code?: number;
    message?: string;
  };
}

async function authApiRequest(
  endpoint: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const url = `${AUTH_BASE_URL}:${endpoint}?key=${FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as Record<string, unknown> | AuthApiError;

  if (!res.ok) {
    const msg =
      (data as AuthApiError)?.error?.message ?? "Auth-Fehler";
    throw new Error(mapAuthErrorMessage(msg));
  }

  return data as Record<string, unknown>;
}

function mapAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    EMAIL_EXISTS: "E-Mail wird bereits verwendet.",
    INVALID_EMAIL: "Ungültige E-Mail-Adresse.",
    WEAK_PASSWORD: "Passwort ist zu schwach (min. 8 Zeichen).",
    USER_NOT_FOUND: "Benutzer nicht gefunden.",
    MISSING_ID_TOKEN: "Sitzung abgelaufen. Bitte erneut anmelden.",
    INVALID_ID_TOKEN: "Sitzung abgelaufen. Bitte erneut anmelden.",
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
      "Sitzung abgelaufen. Bitte erneut anmelden.",
  };
  return messages[code] ?? `Fehler: ${code}`;
}

async function getAuthIdToken(): Promise<string> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Du musst angemeldet sein.");
  }
  return currentUser.getIdToken(true);
}

async function createAuthUser(
  email: string,
  password: string,
  displayName: string
): Promise<string> {
  const data = await authApiRequest("signUp", {
    email,
    password,
    displayName,
    returnSecureToken: false,
  });
  if (!data.localId || typeof data.localId !== "string") {
    throw new Error("Unerwartete Antwort vom Auth-Server");
  }
  return data.localId;
}

async function disableAuthUser(_uid: string, _email: string): Promise<void> {
  // We cannot truly delete a Firebase Auth account from the client SDK
  // (would require Admin SDK / Cloud Functions). The Auth account will
  // remain in Firebase Auth, but since the Firestore profile is deleted,
  // the user can no longer access the platform (AuthProvider blocks
  // login without a valid profile).
  // For full deletion, the user must be removed manually from the
  // Firebase Auth Console.
}

// ─── Firestore helpers ──────────────────────────────────────────────────────────

const USERS_COLLECTION = "users";

// ─── Reads ──────────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<PlatformUserData[]> {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(
    usersRef,
    where("role", "in", ["owner", "developer"]),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as PlatformUserData[];
}

export async function getUser(uid: string): Promise<PlatformUserData | null> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    uid: snapshot.id,
    ...snapshot.data(),
  } as PlatformUserData;
}

// ─── Mutations (direct Firestore + Auth REST API) ───────────────────────────────

export async function createUser(data: CreateUserData): Promise<string> {
  // 1. Create Firebase Auth account via REST API
  const uid = await createAuthUser(data.email, data.password, data.displayName);

  // 2. Write Firestore document keyed by Auth UID
  await setDoc(doc(db, USERS_COLLECTION, uid), {
    email: data.email,
    displayName: data.displayName,
    role: data.role,
    disabled: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return uid;
}

export async function updateUser(
  uid: string,
  data: UpdateUserData
): Promise<void> {
  // Update Firestore document (role, displayName, disabled)
  const updateData: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName;
  }
  if (data.role !== undefined) {
    updateData.role = data.role;
  }
  if (data.disabled !== undefined) {
    updateData.disabled = data.disabled;
  }

  if (Object.keys(updateData).length > 1) {
    await updateDoc(doc(db, USERS_COLLECTION, uid), updateData);
  }
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  // User clicks link in email and sets a new password via Firebase reset page.
  await authApiRequest("resetPassword", {
    requestType: "PASSWORD_RESET",
    email,
  });
}

export async function deleteUser(uid: string, email: string): Promise<void> {
  // 1. Mark Auth account as no-op (cannot truly delete without Admin SDK)
  await disableAuthUser(uid, email);
  // 2. Delete Firestore document — user disappears from dashboard
  //    and can no longer log in to the platform (AuthProvider requires
  //    a valid profile)
  await deleteDoc(doc(db, USERS_COLLECTION, uid));
}

export async function toggleUserDisabled(
  uid: string,
  disabled: boolean
): Promise<void> {
  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    disabled,
    updatedAt: serverTimestamp(),
  });
}
