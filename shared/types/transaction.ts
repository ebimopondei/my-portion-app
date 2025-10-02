import { Status, TransactionTypes } from "../enums";
import { OrderWithUser } from "./order";
import type { UserAttributes } from "./user";

export interface TransactionAttribute {
    id?: string;
    order_id: string | null;
    user_id: string;
    amount: number;
    status: Status,
    type: TransactionTypes,
    reference: string | null;
    confirmedAt?: Date,

    
    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}


export type TransactionWithuser = TransactionAttribute & {
    user: UserAttributes;
}

export type TransactionWithOrders = TransactionAttribute & {
    orders: OrderWithUser[];
};


