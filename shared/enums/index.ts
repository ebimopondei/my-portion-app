export const Status = {
    Pending: 'pending',
    Delivered: 'delivered',
    Cancelled: 'cancelled'
} as const;
export const Status = {
    Pending : 'pending',
    Delivered : 'delivered',
    Cancelled : 'cancelled'
} as const

export type Status = (typeof Status)[keyof typeof Status];



export const quantity_unit =  {
    KG : 'kg'
} as const 

export const Roles = {
    USER:"user",
    VENDOR:"vendor",
    ADMIN:"admin",
    SUBADMIN:"subadmin"
}

export type Roles = (typeof Roles)[keyof typeof Roles];
