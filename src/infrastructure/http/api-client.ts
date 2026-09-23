import {useSessionStore} from "../../application/session/session.store.ts"

const API_URL = import.meta.env.VITE_API_URL

export class ApiClient {

    private getHeaders(): HeadersInit {
        const accessToken = useSessionStore.getState().accessToken

        return {
            "Content-Type": "application/json",
            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
            }),
        }
    }

    async post<T>(path: string, body?: unknown): Promise<T> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "POST",
                headers: this.getHeaders(),
                body: body !== undefined ? JSON.stringify(body) : undefined,
            },
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error.message)
        }
        return await response.json()
    }

    async postVoid(path: string, body?: unknown): Promise<void> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "POST",
                headers: this.getHeaders(),
                body: body !== undefined ? JSON.stringify(body) : undefined,
            },
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error.message)
        }
    }

    async get<T>(path: string): Promise<T | null> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "GET",
                headers: this.getHeaders(),
            },
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error.message)
        }

        if (response.status === 204)
            return null

        return await response.json()
    }

    async delete(path: string, body?: unknown): Promise<void> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "DELETE",
                headers: this.getHeaders(),
                body: body !== undefined ? JSON.stringify(body) : undefined,
            },
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error.message)
        }
    }
}

export const apiClient = new ApiClient()