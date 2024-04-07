import { AccountEntity } from "../Entity/AccountEntity";

export class AccountValue implements AccountEntity{
    bank: string;
    balance: number;
    IBAN: string;
    limit_extract: number;
    limit_credit: number;
    username: string;
    pin: string;
    IDCardAssociated: number;
    cardActivated: boolean;
    initialPin: boolean;
    
    constructor(data:AccountEntity){
        this.bank = data.bank
        this.balance = data.balance
        this.IBAN = data.IBAN
        this.limit_extract = data.limit_extract
        this.limit_credit = data.limit_credit
        this.username = data.username
        this.pin = data.pin
        this.IDCardAssociated = data.IDCardAssociated
        this.cardActivated = false
        this.initialPin = false

    }
}