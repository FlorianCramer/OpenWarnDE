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
  Switch,
} from "@/components/ui";
import {
  getDataSources,
  createDataSource,
  updateDataSource,
  deleteDataSource,
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

const FORMAT_OPTIONS = [
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "geojson", label: "GeoJSON" },
  { value: "rss", label: "RSS" },
  { value: "atom", label: "Atom" },
];

const REFRESH_INTERVAL_OPTIONS = [
  { value: "5", label: "5 Minuten" },
  { value: "15", label: "15 Minuten" },
  { value: "30", label: "30 Minuten" },
  { value: "60", label: "1 Stunde" },
  { value: "360", label: "6 Stunden" },
  { value: "1440", label: "1 Tag" },
];

const GEOGRAPHIC_COVERAGE_OPTIONS = [
  { value: "point", label: "Punkt (Point)" },
  { value: "bbox", label: "Bounding Box (BBOX)" },
  { value: "polygon", label: "Polygon" },
  { value: "country", label: "Land" },
  { value: "unknown", label: "Unbekannt" },
];

interface DataSourceFormData {
  name: string;
  type: DataSourceType;
  endpointUrl: string;
  endpointMethod: "GET" | "POST";
  format: "json" | "xml" | "geojson" | "rss" | "atom";
  description: string;
  refreshInterval: number;
  enabled: boolean;
  geographicCoverageType: "point" | "bbox" | "polygon" | "country" | "unknown";
  capabilitiesRealtime: boolean;
  capabilitiesHistorical: boolean;
  capabilitiesSpatial: boolean;
}

interface DataSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  dataSource?: DataSource | null;
  onSubmit: (data: DataSourceFormData) => Promise<void>;
  loading?: boolean;
}

function DataSourceDialogForm({
  mode,
  dataSource,
  onSubmit,
  onOpenChange,
  loading,
}: Omit<DataSourceDialogProps, "open">) {
  const [formData, setFormData] = React.useState<DataSourceFormData>(() => {
    if (mode === "edit" && dataSource) {
      return {
        name: dataSource.name,
        type: dataSource.type,
        endpointUrl: dataSource.endpoint.url,
        endpointMethod: dataSource.endpoint.method,
        format: dataSource.format,
        description: dataSource.description ?? "",
        refreshInterval: dataSource.refreshInterval,
        enabled: dataSource.enabled,
        geographicCoverageType: dataSource.geographicCoverage.type,
        capabilitiesRealtime: dataSource.capabilities.realtime,
        capabilitiesHistorical: dataSource.capabilities.historical,
        capabilitiesSpatial: dataSource.capabilities.spatial,
      };
    }
    return {
      name: "",
      type: "custom",
      endpointUrl: "",
      endpointMethod: "GET",
      format: "json",
      description: "",
      refreshInterval: 15,
      enabled: true,
      geographicCoverageType: "unknown",
      capabilitiesRealtime: false,
      capabilitiesHistorical: false,
      capabilitiesSpatial: false,
    };
  });
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Name ist erforderlich");
      return;
    }

    if (!formData.endpointUrl.trim()) {
      setError("URL ist erforderlich");
      return;
    }

    try {
      new URL(formData.endpointUrl);
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
    <>
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
            <Label htmlFor="endpointUrl">URL *</Label>
            <Input
              id="endpointUrl"
              type="url"
              value={formData.endpointUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endpointUrl: e.target.value }))
              }
              placeholder="https://api.example.com/data"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="endpointMethod">HTTP-Methode *</Label>
            <Select
              value={formData.endpointMethod}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, endpointMethod: value as "GET" | "POST" }))
              }
              options={[{ value: "GET", label: "GET" }, { value: "POST", label: "POST" }]}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="format">Datenformat *</Label>
            <Select
              value={formData.format}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, format: value as "json" | "xml" | "geojson" | "rss" | "atom" }))
              }
              options={FORMAT_OPTIONS}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="geographicCoverageType">Geografische Abdeckung</Label>
            <Select
              value={formData.geographicCoverageType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, geographicCoverageType: value as "point" | "bbox" | "polygon" | "country" | "unknown" }))
              }
              options={GEOGRAPHIC_COVERAGE_OPTIONS}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Fähigkeiten</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="capabilitiesRealtime"
                  checked={formData.capabilitiesRealtime}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, capabilitiesRealtime: checked }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="capabilitiesRealtime" className="text-sm font-normal">Realtime</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="capabilitiesHistorical"
                  checked={formData.capabilitiesHistorical}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, capabilitiesHistorical: checked }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="capabilitiesHistorical" className="text-sm font-normal">Historisch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="capabilitiesSpatial"
                  checked={formData.capabilitiesSpatial}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, capabilitiesSpatial: checked }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="capabilitiesSpatial" className="text-sm font-normal">Räumlich</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="enabled">Aktiviert</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, enabled: checked }))
                }
                disabled={loading}
              />
              <Label htmlFor="enabled" className="text-sm font-normal">Datenquelle aktivieren</Label>
            </div>
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
      </>
    );
  }

function DataSourceDialog(props: DataSourceDialogProps) {
  const { open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl">
        {open && (
          <DataSourceDialogForm
            key={`${props.mode}-${props.dataSource?.id ?? "new"}`}
            {...props}
          />
        )}
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
      <DialogContent size="sm">
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
}

function DataSourceTable({
  dataSources,
  onEdit,
  onDelete,
}: DataSourceTableProps) {
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
          <TableHead>Format</TableHead>
          <TableHead>Intervall</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aktiviert</TableHead>
          <TableHead>Geog. Abdeckung</TableHead>
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
                  href={ds.endpoint.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  {ds.endpoint.url.length > 40 ? `${ds.endpoint.url.slice(0, 40)}...` : ds.endpoint.url}
                </a>
              </TableCell>
              <TableCell className="text-foreground-muted">
                {ds.format}
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
              <TableCell>
                {ds.enabled ? "Ja" : "Nein"}
              </TableCell>
              <TableCell className="text-foreground-muted">
                {ds.geographicCoverage.type}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
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

  const loadDataSources = async () => {
    const data = await getDataSources();
    setDataSources(data);
  };

  React.useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getDataSources();
        if (!ignore) {
          setDataSources(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Fehler beim Laden der Datenquellen"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreate = async (data: DataSourceFormData) => {
    setDialogLoading(true);
    try {
      const createData: CreateDataSourceData = {
        name: data.name,
        type: data.type,
        endpoint: {
          url: data.endpointUrl,
          method: data.endpointMethod,
        },
        format: data.format,
        description: data.description || undefined,
        refreshInterval: data.refreshInterval,
        enabled: data.enabled,
        geographicCoverage: {
          type: data.geographicCoverageType,
          geometry: null,
        },
        capabilities: {
          realtime: data.capabilitiesRealtime,
          historical: data.capabilitiesHistorical,
          spatial: data.capabilitiesSpatial,
        },
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
        endpoint: {
          url: data.endpointUrl,
          method: data.endpointMethod,
        },
        format: data.format,
        description: data.description || null,
        refreshInterval: data.refreshInterval,
        enabled: data.enabled,
        geographicCoverage: {
          type: data.geographicCoverageType,
          geometry: null,
        },
        capabilities: {
          realtime: data.capabilitiesRealtime,
          historical: data.capabilitiesHistorical,
          spatial: data.capabilitiesSpatial,
        },
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
