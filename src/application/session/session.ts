import type { User } from "../../domain/user";

export interface Session {
    user: User | null,
    accessToken: string | null,
    status: SessionStatus

}

export type SessionStatus =
    | "initializing"
    | "authenticated"
    | "unauthenticated";