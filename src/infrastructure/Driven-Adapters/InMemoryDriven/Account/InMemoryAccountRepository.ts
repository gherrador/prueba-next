import { CardAccountData } from "types/types";
import { AccountMockDB } from "../../../../DB/AccountMockDB";
import { AccountRepository } from "../../../../domain/Account/Repository/AccountRepository";
import { AccountEntity } from "domain/Account/Entity/AccountEntity";
import { AccountMockMethods } from "../../../../DB/AccountMockDB";

export class InMemoryAccountRepository implements AccountRepository {
    constructor() { }
    async login (data:CardAccountData):Promise<CardAccountData | undefined>{        
        return data        
    }
    
    async cardActivated(iban: string): Promise<string> {
        await new AccountMockMethods().accountMockActivateCard(iban)
        return "Your card has been successfully activated. For security reasons you must change your pin"

    }

    async ChangePin(iban: string, pin:string): Promise<string> {
        await new AccountMockMethods().accountMockChangePin(iban, pin)
        return "Pin changed successfully"

    }
    async findByIBAN(iban: string): Promise<AccountEntity | undefined> {
        const accountData = await AccountMockDB.find(account => account.IBAN === iban)

        return accountData


    }


}