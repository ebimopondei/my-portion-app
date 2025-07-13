import type { UserAttributes} from '@shared/types/user'


export type loginProps = {
    token: string,
    refreshToken: string,
    user: UserAttributes | null
}

export type AuthResponse = {
    success: boolean,
    message: string,
    data: { 
        token: string,
        refreshToken: string, 
        user: UserAttributes | null
    }
}

export type LoginResponse = AuthResponse
export type RefreshTokenResponse = AuthResponse
export type SignupResponse = AuthResponse