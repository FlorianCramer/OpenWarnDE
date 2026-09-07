import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  DataSource,
  CreateDataSourceData,
  UpdateDataSourceData,
} from "@/types/dataSource";

const DATA_SOURCES_COLLECTION = "dataSources";

// ─── Reads ──────────────────────────────────────────────────────────────────────

export async function getDataSources(): Promise<DataSource[]> {
  const dataSourcesRef = collection(db, DATA_SOURCES_COLLECTION);
  const q = query(dataSourcesRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DataSource[];
}

// ─── Mutations ─────────────────────────────────────────────────────────────────

export async function createDataSource(
  data: CreateDataSourceData
): Promise<string> {
  const dataSourcesRef = collection(db, DATA_SOURCES_COLLECTION);

  const docRef = await addDoc(dataSourcesRef, {
    name: data.name.trim(),
    type: data.type,
    url: data.url.trim(),
    description: data.description?.trim() ?? "",
    status: "pending",
    refreshInterval: data.refreshInterval ?? 15,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastFetch: null,
    errorMessage: null,
  });

  return docRef.id;
}

export async function updateDataSource(
  id: string,
  data: UpdateDataSourceData
): Promise<void> {
  const docRef = doc(db, DATA_SOURCES_COLLECTION, id);

  const updateData: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }
  if (data.type !== undefined) {
    updateData.type = data.type;
  }
  if (data.url !== undefined) {
    updateData.url = data.url.trim();
  }
  if (data.description !== undefined) {
    updateData.description = data.description?.trim() ?? null;
  }
  if (data.status !== undefined) {
    updateData.status = data.status;
  }
  if (data.refreshInterval !== undefined) {
    updateData.refreshInterval = data.refreshInterval;
  }
  if (data.errorMessage !== undefined) {
    updateData.errorMessage = data.errorMessage;
  }

  await updateDoc(docRef, updateData);
}

export async function deleteDataSource(id: string): Promise<void> {
  const docRef = doc(db, DATA_SOURCES_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function toggleDataSourceStatus(
  id: string,
  currentStatus: string
): Promise<void> {
  const newStatus = currentStatus === "active" ? "inactive" : "active";
  await updateDataSource(id, { status: newStatus as "active" | "inactive" });
}
