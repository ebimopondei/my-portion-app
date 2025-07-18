
export interface BankAttributes {
    id?: string;
    user_id: string;
    bank_name: string;
    account_number: string;
    account_name: string;

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}