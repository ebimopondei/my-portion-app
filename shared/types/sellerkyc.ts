export interface SellerKycAttribute {
    id?: string;
    user_id: string;
    id_image_url: string;
    address_proof_url:string;
    is_verified:boolean;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}