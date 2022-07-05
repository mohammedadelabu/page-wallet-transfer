export interface user {
    firstName? : string
    lastName?: string
    DOB?: Date
    email: string
    password:string
    phoneNumber?: string
}
export interface balance {
    userId? : string
    balance: number
    walletId: number
    updateDate: Date | null
}
export interface transactions {
    reference: string
    senderWalletId: string
    amount: number
    receiverWalletId: string
    transferDescription: string
}

export interface customError{
    statusCode: any
}

export interface register {
    fullname: string
    email: string
    password: string
}

export interface login {
    fullname: string
    email: string
    password: string
}