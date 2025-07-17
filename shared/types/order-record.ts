import { Status } from "../enums";

export interface OrderRecordAttribute {
    id?: string;
    user_id: string;
    product_id: string[];
    status: Status;
    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}