export interface KycBusinessAttribute {
    id?: string;
    user_id: string;
    business_name: string;
    business_email:string;
    business_phone_number:string;
    cac_number:string;
    tax_id:string;
    business_address:string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}