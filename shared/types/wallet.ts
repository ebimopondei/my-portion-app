
export interface WalletAttributes {
    id?: string;
    user_id: string;
    main_balance: number;
    sub_balance: number

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}