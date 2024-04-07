export interface AccountEntity{
    bank: string
    balance: number
    IBAN: string
    limit_extract: number
    limit_credit: number   
    username:string
    pin:string
    IDCardAssociated:number
    cardActivated: boolean
    initialPin:boolean
}