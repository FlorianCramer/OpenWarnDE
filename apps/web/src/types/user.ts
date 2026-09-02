import type { Timestamp } from "firebase/firestore";

export type UserRole =
    | "owner"
    | "developer";

export type PlatformUser = {
    uid: string;
    email: string | null;
    displayName: string | null;

    role: UserRole;

    createdAt: Timestamp;
    updatedAt: Timestamp;
};
