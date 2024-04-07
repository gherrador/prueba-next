import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";

export class ChangePinUseCase{
    private readonly _accountRepository: AccountRepository
    private readonly _usernameExistService: DataAccountService

    constructor(accountRepository:AccountRepository){
        this._accountRepository = accountRepository
        this._usernameExistService = DataAccountService.instance(this._accountRepository)
    }

    async run(iban:string, pin:string):Promise<string | undefined>{     
        const userData = await this._usernameExistService.run(iban)           
        const usernameLogin = await this._accountRepository.ChangePin(userData!.IBAN, pin)
        return usernameLogin
    }
}