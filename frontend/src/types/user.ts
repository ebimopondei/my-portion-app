import type { UserAttributes } from '@shared/types/user'

export interface UserResponse{
    success: boolean,
    message: string,
    data: UserAttributes | null
}
