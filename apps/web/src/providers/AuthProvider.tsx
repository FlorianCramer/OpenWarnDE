"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { onAuthStateChanged, type User } from "firebase/auth";
import {
  doc,
  getDoc,
  type DocumentData,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import type {
  PlatformUser,
  UserRole,
} from "@/types/user";

type AuthContextType = {
  user: User | null;
  platformUser: PlatformUser | null;
  profileError: string | null;
  loading: boolean;
  refreshPlatformUser: (
    firebaseUser?: User | null
  ) => Promise<PlatformUser | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

const USER_ROLES: readonly UserRole[] = [
  "owner",
  "developer",
];

function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    USER_ROLES.includes(value as UserRole)
  );
}

function createPlatformUser(
  firebaseUser: User,
  data: DocumentData
): PlatformUser | null {
  if (!isUserRole(data.role)) {
    return null;
  }

  if (!data.createdAt || !data.updatedAt) {
    return null;
  }

  // Block disabled users from being treated as active platform users
  if (data.disabled === true) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName:
      data.displayName ??
      firebaseUser.displayName ??
      null,
    role: data.role,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

async function loadPlatformUser(
  firebaseUser: User
): Promise<PlatformUser | null> {
  const userRef = doc(
    db,
    "users",
    firebaseUser.uid
  );

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  return createPlatformUser(
    firebaseUser,
    userSnapshot.data()
  );
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [platformUser, setPlatformUser] =
    useState<PlatformUser | null>(null);

  const [profileError, setProfileError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshPlatformUser = useCallback(
    async (firebaseUser = user) => {
      if (!firebaseUser) {
        setPlatformUser(null);
        setProfileError(null);
        return null;
      }

      try {
        setProfileError(null);

        const refreshedUser =
          await loadPlatformUser(firebaseUser);

        if (!refreshedUser) {
          setProfileError(
            "Firestore document is missing or has an invalid role/profile shape."
          );
        }

        setPlatformUser(refreshedUser);

        return refreshedUser;
      } catch (error) {
        console.error(
          "Failed to refresh platform user:",
          error
        );

        setPlatformUser(null);
        setProfileError(
          error instanceof Error
            ? error.message
            : "Failed to refresh platform user."
        );
        return null;
      }
    },
    [user]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setLoading(true);
        setUser(firebaseUser);

        if (!firebaseUser) {
          setPlatformUser(null);
          setProfileError(null);
          setLoading(false);
          return;
        }

        try {
          setProfileError(null);

          const platformUser =
            await loadPlatformUser(firebaseUser);

          if (!platformUser) {
            setProfileError(
              "Firestore document is missing or has an invalid role/profile shape."
            );
          }

          setPlatformUser(platformUser);
        } catch (error) {
          console.error(
            "Failed to load platform user:",
            error
          );

          setPlatformUser(null);
          setProfileError(
            error instanceof Error
              ? error.message
              : "Failed to load platform user."
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        platformUser,
        profileError,
        loading,
        refreshPlatformUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}
