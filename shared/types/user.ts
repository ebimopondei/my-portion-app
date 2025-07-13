import type { Role } from "./role";

export interface UserAttributes {
    id?: number;
    username?: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}