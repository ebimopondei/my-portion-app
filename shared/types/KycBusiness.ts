export interface KycBusinessAttribute {
    id?: string;
    user_id: string;
    business_name: string;
    business_email:string;
    cac_number:string;
    tax_id:string;
    business_address:string;
    town:string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}