import { CardAccountData } from "../../../types/types"
import { AccountEntity } from "../Entity/AccountEntity"

export interface AccountRepository{        
    cardActivated:(IDCard:string) => Promise<string> 
    login:(cardData:CardAccountData) => Promise<CardAccountData | undefined>
    findByIBAN:(iban:string) => Promise<AccountEntity|undefined>
    ChangePin:(iban:string, pin:string) => Promise<string>
}