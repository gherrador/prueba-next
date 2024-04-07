import { AccountEntity } from "domain/Account/Entity/AccountEntity";
import { DataUserNotFound } from "../Exceptions/DataUserNotFound";
import { AccountRepository } from "../Repository/AccountRepository";


export class DataAccountService {
    private readonly _accountRepository: AccountRepository
    private static INSTANCE: DataAccountService

    constructor(accountRepository: AccountRepository) {
        this._accountRepository = accountRepository
    }

    static instance(accountRepository: AccountRepository) {
        if (!DataAccountService.INSTANCE) {
            DataAccountService.INSTANCE = new DataAccountService(accountRepository)
        }
        return DataAccountService.INSTANCE
    }

    async run(IBAN: string): Promise<AccountEntity | null> {
        const accountData = await this._accountRepository.findByIBAN(IBAN)
        if (!accountData) throw new DataUserNotFound()
        return accountData
    }
}