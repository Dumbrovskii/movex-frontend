export interface TokenStorage {
    getRefreshToken(): string | null
    setRefreshToken(token: string): void
    removeRefreshToken(): void
}

class LocalTokenStorage implements TokenStorage {
    private readonly key = "refresh_token"

    getRefreshToken(): string | null {
        return localStorage.getItem(this.key)
    }
    setRefreshToken(token: string): void {
        localStorage.setItem(this.key, token)
    }
    removeRefreshToken(): void {
        localStorage.removeItem(this.key)
    }
}

export const tokenStorage = new LocalTokenStorage();