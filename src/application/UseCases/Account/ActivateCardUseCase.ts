import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";

export class ActivateCardUseCase{
    private readonly _accountRepository: AccountRepository
    private readonly _usernameExistService: DataAccountService

    constructor(accountRepository:AccountRepository){
        this._accountRepository = accountRepository
        this._usernameExistService = DataAccountService.instance(this._accountRepository)
    }

    async run(iban:string):Promise<string | undefined>{     
        const userData = await this._usernameExistService.run(iban)  
        
        if (userData!.cardActivated === true) throw new Error("Card already activate")
        const usernameLogin = await this._accountRepository.cardActivated(userData!.IBAN)
        return usernameLogin
    }
}