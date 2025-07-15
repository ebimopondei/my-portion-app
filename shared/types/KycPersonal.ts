export interface KycPersonalAttribute {
    id?: string;
    user_id: string;
    firstnname: string,
    lastname: string,
    date_of_birth: Date,
    phone_number: string,
    email: string,
    bvn: string,
    address: string,
    town: string,
    city: string,
    state: string,

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}