import { create } from "zustand"
import type { Session } from "./session"

interface SessionStore extends Session {
    authenticate: (user: Session["user"], accessToken: string) => void
    unauthenticate: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
    user: null,
    accessToken: null,
    status: "initializing",

    authenticate: (user, accessToken) =>
        set({
            user,
            accessToken,
            status: "authenticated",
        }),

    unauthenticate: () =>
        set({
            user: null,
            accessToken: null,
            status: "unauthenticated",
        }),
}));