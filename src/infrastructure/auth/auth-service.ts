import type { User } from "../../domain/user"
import { apiClient } from "../http/api-client"

export interface VerifyCodeResponse {
    access_token: string
    refresh_token: string
    user: User
}

export interface RefreshTokenResponse {
    access_token: string
    refresh_token: string
}

class AuthService {
    async requestCode(phone: string): Promise<void> {
        await apiClient.post<unknown>(
            "/auth/request-code",
            { phone },
        )
    }

    async verifyCode(phone: string, code: string): Promise<VerifyCodeResponse> {
        return apiClient.post<VerifyCodeResponse>(
            "/auth/verify-code",
            { phone, code },
        )
    }

    async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
        return apiClient.post<RefreshTokenResponse>(
            "/auth/refresh",
            { refresh_token: refreshToken },
        )
    }

    async logout(refreshToken: string): Promise<void> {
        await apiClient.postVoid(
            "/auth/logout",
            { refresh_token: refreshToken },
        )
    }
}

export const authService = new AuthService()