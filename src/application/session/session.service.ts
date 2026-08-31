import {tokenStorage} from "../../infrastructure/auth/token-storage.ts"
import {useSessionStore} from "./session.store.ts"
import {authService} from "../../infrastructure/auth/auth-service.ts";

class SessionService {
    async initialize(): Promise<void> {
        const refreshToken = tokenStorage.getRefreshToken()

        if (!refreshToken) {
            useSessionStore.getState().unauthenticate()
            return
        }

        try {
            const response = await authService.refresh(refreshToken)

            tokenStorage.setRefreshToken(response.refresh_token)
            useSessionStore.getState().authenticate(null, response.access_token)
        } catch {
            tokenStorage.removeRefreshToken()
            useSessionStore.getState().unauthenticate()
        }
    }

    async requestCode(phone: string): Promise<void> {
        await authService.requestCode(phone)
    }

    async login(phone: string, code: string): Promise<void> {
        const response = await authService.verifyCode(phone, code)

        tokenStorage.setRefreshToken(response.refresh_token)
        useSessionStore.getState().authenticate(null, response.access_token)
    }
}

export const sessionService = new SessionService()