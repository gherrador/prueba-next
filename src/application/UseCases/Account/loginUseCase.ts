import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";
import { CardAccountData } from "../../../types/types";
import { Encrypt } from "../../../utils/bcryptMidleware";

export class LoginCardUseCase{
    private readonly _accountRepository: AccountRepository
    private readonly _usernameExistService: DataAccountService

    constructor(accountRepository:AccountRepository){
        this._accountRepository = accountRepository
        this._usernameExistService = DataAccountService.instance(this._accountRepository)
    }

    async run(data:CardAccountData):Promise<CardAccountData | undefined>{     
        const userData = await this._usernameExistService.run(data.IBAN) 
        const dataEncrypt = new Encrypt()
        const validatePin = await dataEncrypt.compare(data.pin, userData!.pin)
        
        if(validatePin !== true) throw new Error ("Incorrect Password")
            
        const cardDataUser = {
            IBAN: data.IBAN,
            idCard: userData!.IDCardAssociated,
            type: data.type,
            bank: userData!.bank,
            pin: userData!.pin,
            username:userData!.username,
            cardActivated:userData!.cardActivated,
            initialPin: userData!.initialPin

        }    
        const usernameLogin = await this._accountRepository.login(cardDataUser)
        return usernameLogin
    }
}