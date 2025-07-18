import { Status } from "../enums";

export interface OrderAttribute {
    id?: string;
    user_id: string;
    portion: number,
    amount: string,
    product_id: string;
    order_record_id: string;
    status: Status;
    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}