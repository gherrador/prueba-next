import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";
import { balanceFinalToUpdate, dataUserCard } from "../../../types/types";
import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { MovementValidate } from "../../../utils/MovementValidate";
import { MovementValue } from "../../../domain/Movement/Value/MovementValue";
import { MovementEntity } from "../../../domain/Movement/Entity/MovementEntity";
import { MovementRepository } from "../../../domain/Movement/Repository/MovementRepository";


export class ExrtactMoneyUseCase {
    private readonly _accountRepository: AccountRepository
    private readonly _movementRepository: MovementRepository
    private readonly _dataAccountService: DataAccountService
   
    constructor(accountRepository: AccountRepository, movementRepository:MovementRepository) {
        this._movementRepository = movementRepository
        this._accountRepository = accountRepository
        this._dataAccountService = DataAccountService.instance(this._accountRepository)
    }

    async run(data: dataUserCard, qty: number, bank:string): Promise<MovementEntity | undefined> {          
        const cardData = await this._dataAccountService.run(data.IBAN)
        
        /**Si se extra dinero de otro banco se abonara un 3% del dinero ingresado como comision, 
         * lo que se refleja en una disminucion del 3% en el dinero ingresado */        
        
        const qtyWithComision = data.bank !== bank ? (qty - qty*0.03) : qty
        const movementValidate = new MovementValidate()
        const resultValidate = await movementValidate.extractValidate(cardData!.balance, data.type, cardData!.limit_extract, qtyWithComision, cardData?.limit_credit)
        const dataToUpdated:balanceFinalToUpdate = {
            balance: resultValidate,
            IBAN: cardData!.IBAN,
        }
        /**Al extraer dinero debemos de crear un nuevo movimiento para registrarlo en la Db de movimientos */   
        const newMovement = new MovementValue({
            typeOfMovement: 'extraction',
            quantity: resultValidate,
            IBAN: data.IBAN

        })
        const usernameLogin = await this._movementRepository.extractMoney(dataToUpdated, newMovement)
        return usernameLogin
    }
}