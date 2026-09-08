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
  DataSourceStatus,
} from "@/types/dataSource";

const DATA_SOURCES_COLLECTION = "dataSources";

const DEFAULT_GEOGRAPHIC_COVERAGE = {
  type: "unknown",
  geometry: null,
} as const;

const DEFAULT_CAPABILITIES = {
  realtime: false,
  historical: false,
  spatial: false,
} as const;

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
    description: data.description?.trim() ?? "",
    type: data.type,
    endpoint: {
      url: data.endpoint.url.trim(),
      method: data.endpoint.method,
    },
    format: data.format,
    enabled: data.enabled ?? true,
    status: data.status ?? "pending",
    refreshInterval: data.refreshInterval ?? 15,
    geographicCoverage: data.geographicCoverage ?? DEFAULT_GEOGRAPHIC_COVERAGE,
    capabilities: data.capabilities ?? DEFAULT_CAPABILITIES,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastFetch: null,
    lastSuccess: null,
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
  if (data.description !== undefined) {
    updateData.description = data.description?.trim() ?? null;
  }
  if (data.type !== undefined) {
    updateData.type = data.type;
  }
  if (data.endpoint !== undefined) {
    updateData.endpoint = {
      url: data.endpoint.url.trim(),
      method: data.endpoint.method,
    };
  }
  if (data.format !== undefined) {
    updateData.format = data.format;
  }
  if (data.enabled !== undefined) {
    updateData.enabled = data.enabled;
  }
  if (data.status !== undefined) {
    updateData.status = data.status;
  }
  if (data.refreshInterval !== undefined) {
    updateData.refreshInterval = data.refreshInterval;
  }
  if (data.geographicCoverage !== undefined) {
    updateData.geographicCoverage = data.geographicCoverage;
  }
  if (data.capabilities !== undefined) {
    updateData.capabilities = data.capabilities;
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

export async function setDataSourceEnabled(
  id: string,
  enabled: boolean
): Promise<void> {
  await updateDataSource(id, { enabled });
}

export async function setDataSourceStatus(
  id: string,
  status: DataSourceStatus
): Promise<void> {
  await updateDataSource(id, { status });
}