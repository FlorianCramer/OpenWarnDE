"use client";

import * as React from "react";
import {
  Button,
  Input,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  Label,
} from "@/components/ui";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserDisabled,
  sendPasswordResetEmail,
  type PlatformUserData,
  type CreateUserData,
  type UpdateUserData,
} from "@/lib/users";
import type { UserRole } from "@/types/user";

const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  developer: "Developer",
};

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "developer", label: "Developer" },
];

interface UserFormData {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
}

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  user?: PlatformUserData | null;
  onSubmit: (data: UserFormData) => Promise<void>;
  loading?: boolean;
}

function UserDialog({ open, onOpenChange, mode, user, onSubmit, loading }: UserDialogProps) {
  const [formData, setFormData] = React.useState<UserFormData>({
    email: "",
    password: "",
    displayName: "",
    role: "developer",
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && user) {
        setFormData({
          email: user.email,
          password: "",
          displayName: user.displayName ?? "",
          role: user.role,
        });
      } else {
        setFormData({
          email: "",
          password: "",
          displayName: "",
          role: "developer",
        });
      }
      setError(null);
    }
  }, [open, mode, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError("E-Mail ist erforderlich");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Ungültige E-Mail-Adresse");
      return;
    }

    if (mode === "create") {
      if (!formData.password) {
        setError("Passwort ist erforderlich");
        return;
      }
      if (formData.password.length < 8) {
        setError("Passwort muss mindestens 8 Zeichen lang sein");
        return;
      }
    } else if (formData.password && formData.password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    if (!formData.displayName.trim()) {
      setError("Name ist erforderlich");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Benutzer erstellen" : "Benutzer bearbeiten"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fülle das Formular aus, um einen neuen Benutzer zu erstellen."
              : "Bearbeite die Benutzerdaten."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="benutzer@beispiel.de"
              disabled={loading || (mode === "edit")}
              required
            />
            {mode === "edit" && (
              <p className="mt-1 text-xs text-[#8a94a6]">
                Die E-Mail-Adresse kann nicht geändert werden.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">
              {mode === "create" ? "Passwort *" : "Neues Passwort"}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder={mode === "create" ? "Mindestens 8 Zeichen" : "Leer lassen, um nicht zu ändern"}
              disabled={loading}
              minLength={mode === "create" ? 8 : undefined}
              required={mode === "create"}
            />
            {mode === "edit" && (
              <p className="mt-1 text-xs text-[#8a94a6]">
                Wenn ausgefüllt, wird eine Passwort-Reset-E-Mail an den Benutzer gesendet.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="displayName">Name *</Label>
            <Input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, displayName: e.target.value }))
              }
              placeholder="Max Mustermann"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Rolle</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value as UserRole }))
              }
              options={ROLE_OPTIONS}
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
              {loading ? "Wird gespeichert..." : mode === "create" ? "Erstellen" : "Speichern"}
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
  user: PlatformUserData | null;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

function DeleteDialog({ open, onOpenChange, user, onConfirm, loading }: DeleteDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Benutzer löschen</DialogTitle>
          <DialogDescription>
            Möchtest du den Benutzer{" "}
            <span className="font-semibold text-[#172033]">
              {user?.displayName ?? user?.email}
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
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Wird gelöscht..." : "Löschen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UserTableProps {
  users: PlatformUserData[];
  onEdit: (user: PlatformUserData) => void;
  onDelete: (user: PlatformUserData) => void;
  onToggleDisabled: (user: PlatformUserData) => void;
}

function UserTable({ users, onEdit, onDelete, onToggleDisabled }: UserTableProps) {
  const formatDate = (timestamp: { toDate: () => Date } | null | undefined) => {
    if (!timestamp) return "-";
    try {
      return timestamp.toDate().toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(/[ @._-]/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
    }
    return email
      .split(/[@]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  };

  if (users.length === 0) {
    return (
      <div className="rounded-md border border-[#dfe5ec] bg-white py-12 text-center">
        <p className="text-sm text-[#5d6878]">Keine Benutzer gefunden.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Benutzer</TableHead>
          <TableHead>Rolle</TableHead>
          <TableHead>Erstellt am</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.uid}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#184e63] text-xs font-bold text-white">
                  {getInitials(user.displayName, user.email)}
                </div>
                <div>
                  <p className="font-medium">
                    {user.displayName ?? <span className="text-[#8a94a6]">-</span>}
                  </p>
                  <p className="text-xs text-[#5d6878]">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={user.role}>{ROLE_LABELS[user.role]}</Badge>
            </TableCell>
            <TableCell className="text-[#5d6878]">
              {formatDate(user.createdAt)}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.disabled
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.disabled ? "Deaktiviert" : "Aktiv"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleDisabled(user)}
                  className="h-8 px-2 text-xs"
                >
                  {user.disabled ? "Aktivieren" : "Deaktivieren"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(user)}
                  className="h-8 px-2 text-xs"
                >
                  Bearbeiten
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(user)}
                  className="h-8 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Löschen
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function UserManagement() {
  const [activeTab, setActiveTab] = React.useState<UserRole>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("userMgmtTab") as UserRole) ?? "owner";
    }
    return "owner";
  });
  const [users, setUsers] = React.useState<PlatformUserData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<PlatformUserData | null>(null);
  const [dialogLoading, setDialogLoading] = React.useState(false);

  const loadUsers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Laden der Benutzer");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  React.useEffect(() => {
    localStorage.setItem("userMgmtTab", activeTab);
  }, [activeTab]);

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => user.role === activeTab);
  }, [users, activeTab]);

  const handleCreate = async (data: UserFormData) => {
    setDialogLoading(true);
    try {
      const createData: CreateUserData = {
        email: data.email,
        password: data.password,
        displayName: data.displayName.trim(),
        role: data.role,
      };
      await createUser(createData);
      await loadUsers();
    } finally {
      setDialogLoading(false);
    }
  };

  const handleEdit = async (data: UserFormData) => {
    if (!selectedUser) return;
    setDialogLoading(true);
    try {
      const updateData: UpdateUserData = {
        displayName: data.displayName || null,
        role: data.role,
      };
      await updateUser(selectedUser.uid, updateData);

      // If a new password was provided, send a reset email
      if (data.password) {
        await sendPasswordResetEmail(selectedUser.email);
      }
      await loadUsers();
    } finally {
      setDialogLoading(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setDialogLoading(true);
    try {
      await deleteUser(selectedUser.uid, selectedUser.email);
      await loadUsers();
    } finally {
      setDialogLoading(false);
      setSelectedUser(null);
    }
  };

  const handleToggleDisabled = async (user: PlatformUserData) => {
    try {
      await toggleUserDisabled(user.uid, !user.disabled);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Aktualisieren des Benutzers");
    }
  };

  const openEditDialog = (user: PlatformUserData) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (user: PlatformUserData) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#172033]">Benutzerverwaltung</h2>
          <p className="mt-1 text-sm text-[#5d6878]">
            Verwalte Benutzer mit Owner- und Developer-Rollen.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          + Neuer Benutzer
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UserRole)}>
        <TabsList>
          <TabsTrigger value="owner">
            Owner ({users.filter((u) => u.role === "owner").length})
          </TabsTrigger>
          <TabsTrigger value="developer">
            Developer ({users.filter((u) => u.role === "developer").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owner">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          {loading ? (
            <div className="rounded-md border border-[#dfe5ec] bg-white py-12 text-center">
              <p className="text-sm text-[#5d6878]">Benutzer werden geladen...</p>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              onToggleDisabled={handleToggleDisabled}
            />
          )}
        </TabsContent>

        <TabsContent value="developer">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          {loading ? (
            <div className="rounded-md border border-[#dfe5ec] bg-white py-12 text-center">
              <p className="text-sm text-[#5d6878]">Benutzer werden geladen...</p>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              onToggleDisabled={handleToggleDisabled}
            />
          )}
        </TabsContent>
      </Tabs>

      <UserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        mode="create"
        onSubmit={handleCreate}
        loading={dialogLoading}
      />

      <UserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        user={selectedUser}
        onSubmit={handleEdit}
        loading={dialogLoading}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={selectedUser}
        onConfirm={handleDelete}
        loading={dialogLoading}
      />
    </div>
  );
}
