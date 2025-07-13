import { Status } from "../enums";

export interface OrderAttribute {
    id?: string;
    buyer_id: string;
    product_id: string;
    status: Status;
    quantity: number;
    total_price: number;
    delivery_address: number;
    available_portions: number;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}