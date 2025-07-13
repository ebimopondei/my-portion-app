export interface RatingAttribute {
    id?: string;
    buyer_id: string;
    seller_id: string;
    order_id: string;
    stars: number;
    comment: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}