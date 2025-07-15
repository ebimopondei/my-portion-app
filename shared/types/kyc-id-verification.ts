export interface KycIdVerificationAttribute {
    id?: string;
    user_id: string;
    id_type: string;
    id_number:string;
    id_front:string;
    id_back:string;
    passport:string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}