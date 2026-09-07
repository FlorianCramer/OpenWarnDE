"use client";

import * as React from "react";
import {
  Button,
  Input,
  Textarea,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Select,
  Label,
} from "@/components/ui";
import {
  getDataSources,
  createDataSource,
  updateDataSource,
  deleteDataSource,
  toggleDataSourceStatus,
} from "@/lib/dataSources";
import type {
  DataSource,
  CreateDataSourceData,
  UpdateDataSourceData,
  DataSourceStatus,
  DataSourceType,
} from "@/types/dataSource";

const STATUS_LABELS: Record<DataSourceStatus, { label: string; color: string }> = {
  active: { label: "Aktiv", color: "bg-success-muted text-success-text" },
  inactive: { label: "Inaktiv", color: "bg-surface-muted text-foreground-muted" },
  error: { label: "Fehler", color: "bg-danger-muted text-danger-text" },
  pending: { label: "Ausstehend", color: "bg-warning-muted text-warning-text" },
};

const TYPE_LABELS: Record<DataSourceType, string> = {
  dwd: "DWD",
  pegel: "Pegel",
  weather: "Wetter",
  earthquake: "Erdbeben",
  custom: "Benutzerdefiniert",
};

const TYPE_OPTIONS = [
  { value: "dwd", label: "DWD" },
  { value: "pegel", label: "Pegel" },
  { value: "weather", label: "Wetter" },
  { value: "earthquake", label: "Erdbeben" },
  { value: "custom", label: "Benutzerdefiniert" },
];

const REFRESH_INTERVAL_OPTIONS = [
  { value: "5", label: "5 Minuten" },
  { value: "15", label: "15 Minuten" },
  { value: "30", label: "30 Minuten" },
  { value: "60", label: "1 Stunde" },
  { value: "360", label: "6 Stunden" },
  { value: "1440", label: "1 Tag" },
];

interface DataSourceFormData {
  name: string;
  type: DataSourceType;
  url: string;
  description: string;
  refreshInterval: number;
}

interface DataSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  dataSource?: DataSource | null;
  onSubmit: (data: DataSourceFormData) => Promise<void>;
  loading?: boolean;
}

function DataSourceDialog({
  open,
  onOpenChange,
  mode,
  dataSource,
  onSubmit,
  loading,
}: DataSourceDialogProps) {
  const [formData, setFormData] = React.useState<DataSourceFormData>({
    name: "",
    type: "custom",
    url: "",
    description: "",
    refreshInterval: 15,
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && dataSource) {
        setFormData({
          name: dataSource.name,
          type: dataSource.type,
          url: dataSource.url,
          description: dataSource.description ?? "",
          refreshInterval: dataSource.refreshInterval,
        });
      } else {
        setFormData({
          name: "",
          type: "custom",
          url: "",
          description: "",
          refreshInterval: 15,
        });
      }
      setError(null);
    }
  }, [open, mode, dataSource]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Name ist erforderlich");
      return;
    }

    if (!formData.url.trim()) {
      setError("URL ist erforderlich");
      return;
    }

    try {
      new URL(formData.url);
    } catch {
      setError("Ungültige URL");
      return;
    }

    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (err) {
      let message = "Ein Fehler ist aufgetreten";
      if (err && typeof err === "object" && "message" in err) {
        message = String((err as { message: unknown }).message);
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Datenquelle erstellen" : "Datenquelle bearbeiten"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fülle das Formular aus, um eine neue Datenquelle hinzuzufügen."
              : "Bearbeite die Datenquelle."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-danger-muted p-3 text-sm text-danger-text">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="z.B. DWD Warnungen Deutschland"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Typ *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value as DataSourceType }))
              }
              options={TYPE_OPTIONS}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="https://api.example.com/data"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Optionale Beschreibung der Datenquelle..."
              disabled={loading}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="refreshInterval">Aktualisierungsintervall</Label>
            <Select
              value={String(formData.refreshInterval)}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  refreshInterval: Number(value),
                }))
              }
              options={REFRESH_INTERVAL_OPTIONS}
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Abbrechen
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Wird gespeichert..."
                : mode === "create"
                  ? "Erstellen"
                  : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataSource: DataSource | null;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

function DeleteDialog({
  open,
  onOpenChange,
  dataSource,
  onConfirm,
  loading,
}: DeleteDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Datenquelle löschen</DialogTitle>
          <DialogDescription>
            Möchtest du die Datenquelle{" "}
            <span className="font-semibold text-foreground">
              {dataSource?.name}
            </span>{" "}
            wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Abbrechen
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="bg-danger hover:bg-danger-hover"
          >
            {loading ? "Wird gelöscht..." : "Löschen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DataSourceTableProps {
  dataSources: DataSource[];
  onEdit: (dataSource: DataSource) => void;
  onDelete: (dataSource: DataSource) => void;
  onToggleStatus: (dataSource: DataSource) => void;
}

function DataSourceTable({
  dataSources,
  onEdit,
  onDelete,
  onToggleStatus,
}: DataSourceTableProps) {
  const formatDate = (
    timestamp: { toDate: () => Date } | null | undefined
  ) => {
    if (!timestamp) return "-";
    try {
      return timestamp.toDate().toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const formatInterval = (minutes: number) => {
    if (minutes < 60) return `${minutes} Min.`;
    if (minutes < 1440) return `${minutes / 60} Std.`;
    return `${minutes / 1440} Tag(e)`;
  };

  if (dataSources.length === 0) {
    return (
      <div className="rounded-md border border-border bg-surface py-12 text-center">
        <p className="text-sm text-foreground-muted">
          Keine Datenquellen vorhanden. Erstelle eine neue Datenquelle.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Intervall</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Letzter Abruf</TableHead>
          <TableHead className="text-right">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataSources.map((ds) => {
          const status = STATUS_LABELS[ds.status];
          return (
            <TableRow key={ds.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{ds.name}</p>
                  {ds.description && (
                    <p className="mt-0.5 text-xs text-foreground-muted line-clamp-1">
                      {ds.description}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{TYPE_LABELS[ds.type]}</Badge>
              </TableCell>
              <TableCell>
                <a
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  {ds.url.length > 40 ? `${ds.url.slice(0, 40)}...` : ds.url}
                </a>
              </TableCell>
              <TableCell className="text-foreground-muted">
                {formatInterval(ds.refreshInterval)}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}
                >
                  {status.label}
                </span>
                {ds.errorMessage && (
                  <p
                    className="mt-1 max-w-[200px] truncate text-xs text-danger"
                    title={ds.errorMessage}
                  >
                    {ds.errorMessage}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-foreground-muted">
                {formatDate(ds.lastFetch)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(ds)}
                    className="h-8 px-2 text-xs"
                  >
                    {ds.status === "active" ? "Deaktivieren" : "Aktivieren"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(ds)}
                    className="h-8 px-2 text-xs"
                  >
                    Bearbeiten
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(ds)}
                    className="h-8 px-2 text-xs text-danger hover:bg-danger-muted hover:text-danger-hover"
                  >
                    Löschen
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function DataSources() {
  const [dataSources, setDataSources] = React.useState<DataSource[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedDataSource, setSelectedDataSource] = React.useState<DataSource | null>(
    null
  );
  const [dialogLoading, setDialogLoading] = React.useState(false);

  const loadDataSources = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDataSources();
      setDataSources(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Fehler beim Laden der Datenquellen"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadDataSources();
  }, [loadDataSources]);

  const handleCreate = async (data: DataSourceFormData) => {
    setDialogLoading(true);
    try {
      const createData: CreateDataSourceData = {
        name: data.name,
        type: data.type,
        url: data.url,
        description: data.description || undefined,
        refreshInterval: data.refreshInterval,
      };
      await createDataSource(createData);
      await loadDataSources();
    } finally {
      setDialogLoading(false);
    }
  };

  const handleEdit = async (data: DataSourceFormData) => {
    if (!selectedDataSource) return;
    setDialogLoading(true);
    try {
      const updateData: UpdateDataSourceData = {
        name: data.name,
        type: data.type,
        url: data.url,
        description: data.description || null,
        refreshInterval: data.refreshInterval,
      };
      await updateDataSource(selectedDataSource.id, updateData);
      await loadDataSources();
    } finally {
      setDialogLoading(false);
      setSelectedDataSource(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedDataSource) return;
    setDialogLoading(true);
    try {
      await deleteDataSource(selectedDataSource.id);
      await loadDataSources();
    } finally {
      setDialogLoading(false);
      setSelectedDataSource(null);
    }
  };

  const handleToggleStatus = async (dataSource: DataSource) => {
    try {
      await toggleDataSourceStatus(dataSource.id, dataSource.status);
      await loadDataSources();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Fehler beim Aktualisieren der Datenquelle"
      );
    }
  };

  const openEditDialog = (dataSource: DataSource) => {
    setSelectedDataSource(dataSource);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (dataSource: DataSource) => {
    setSelectedDataSource(dataSource);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Datenquellenverwaltung
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Verwalte externe Datenquellen für die OpenWarnDE-Plattform.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          + Neue Datenquelle
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-danger-muted p-4 text-sm text-danger-text">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-md border border-border bg-surface py-12 text-center">
          <p className="text-sm text-foreground-muted">
            Datenquellen werden geladen...
          </p>
        </div>
      ) : (
        <DataSourceTable
          dataSources={dataSources}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <DataSourceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        mode="create"
        onSubmit={handleCreate}
        loading={dialogLoading}
      />

      <DataSourceDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        dataSource={selectedDataSource}
        onSubmit={handleEdit}
        loading={dialogLoading}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        dataSource={selectedDataSource}
        onConfirm={handleDelete}
        loading={dialogLoading}
      />
    </div>
  );
}
