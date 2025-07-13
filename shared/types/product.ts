export interface ProductAttribute {
    id?: string;
    seller_id: string;
    name: string;
    description: string;
    image_url: string;
    total_quantity: number;
    portion_size: number;
    price_per_portion: number;
    available_portions: number;
    location: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}