const API_URL = import.meta.env.VITE_API_URL

export class ApiClient {
    async post<T>(path: string, body?: unknown): Promise<T> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
            },
        )

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const r = await response.json()
        console.log(r)
        return r
    }

    async postVoid(path: string, body?: unknown): Promise<void> {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
            },
        )

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
    }
}

export const apiClient = new ApiClient()