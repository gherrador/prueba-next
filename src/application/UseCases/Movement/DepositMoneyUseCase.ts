import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";
import { balanceFinalToUpdate, dataUserCard } from "../../../types/types";
import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { MovementValidate } from "../../../utils/MovementValidate";
import { MovementValue } from "../../../domain/Movement/Value/MovementValue";
import { MovementEntity } from "domain/Movement/Entity/MovementEntity";
import { MovementRepository } from "domain/Movement/Repository/MovementRepository";


export class DepositMoneyUseCase {
    private readonly _accountRepository: AccountRepository
    private readonly _movementRepository: MovementRepository
    private readonly _dataAccountService: DataAccountService

    constructor(accountRepository: AccountRepository, movementRepository:MovementRepository) {
        this._movementRepository = movementRepository
        this._accountRepository = accountRepository
        this._dataAccountService = DataAccountService.instance(this._accountRepository)
    }

    async run(data: dataUserCard, qty: number, bank:string): Promise<MovementEntity | undefined> {          
        const accountData = await this._dataAccountService.run(data.IBAN)        
        /**Si se extra dinero de otro banco se abonara un 3% del dinero ingresado como comision, 
         * lo que se refleja en una disminucion del 3% en el dinero ingresado */        
               
        const movementValidate = new MovementValidate()
        const resultValidate = await movementValidate.depositValidate(accountData!.balance, qty,accountData!.bank, bank)
        const dataToUpdated:balanceFinalToUpdate = {
            balance: resultValidate,
            IBAN: accountData!.IBAN,
        }

        /**Al extraer dinero debemos de crear un nuevo movimiento para registrarlo en la Db de movimientos */   
        const newMovement = new MovementValue({
            typeOfMovement: 'deposit',
            quantity: resultValidate,
            IBAN: data.IBAN

        })
        const usernameLogin = await this._movementRepository.depositMoney(dataToUpdated, newMovement)
        return usernameLogin
    }
}