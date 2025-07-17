import type { Role } from "./role";

export interface UserAttributes {
    id?: string;
    username?: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
    email_verified: Boolean;
    kyc_verified: Boolean;

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}