import { AccountRepository } from "../../../domain/Account/Repository/AccountRepository";
import { balanceFinalToUpdate, dataUserCard } from "../../../types/types";
import { DataAccountService } from "../../../domain/Account/Service/DataAccountService";
import { MovementValue } from "../../../domain/Movement/Value/MovementValue";
import { MovementEntity } from "../../../domain/Movement/Entity/MovementEntity";
import { MovementRepository } from "../../../domain/Movement/Repository/MovementRepository";


export class TransferMoneyUseCase {
     private readonly _accountRepository: AccountRepository
    private readonly _movementRepository: MovementRepository
    private readonly _dataAccountService: DataAccountService

    constructor(accountRepository: AccountRepository, movementRepository:MovementRepository) {
        this._movementRepository = movementRepository
        this._accountRepository = accountRepository
        this._dataAccountService = DataAccountService.instance(this._accountRepository)
    }

    async run(dataOwn: dataUserCard, qty: number, ibanDestination:string): Promise<MovementEntity[] | undefined> {     

        if(dataOwn.IBAN === ibanDestination) throw new Error("You can't transfer money to yourself")
        
        /** Both IBAN(Origen and Destination) are checked. If both IBAN exists, the operation continue, if not 
         * you receibe an alert with the error */       
        const accountDataOrigen = await this._dataAccountService.run(dataOwn.IBAN)
        const accountDataDestination = await this._dataAccountService.run(ibanDestination)
               
        /** We must modify both balance (Origen and Destination) and generate two movemenets */      
        const balanceOrigenToUpdated:balanceFinalToUpdate = {
            balance: accountDataOrigen!.balance - qty,
            IBAN: accountDataOrigen!.IBAN,
        }
        const balanceDestinationToUpdated:balanceFinalToUpdate = {
            balance: accountDataDestination!.balance + qty,
            IBAN: accountDataDestination!.IBAN,
        }

        /** Transferring money to a bank other than yours may have fees 
         * These fees are represented as a 3% reduction on the money that will reach the destination account.  */

        const finalTransf = dataOwn.bank !== accountDataDestination!.bank ? qty- qty*0.03 : qty

        /**Al extraer dinero debemos de crear un nuevo movimiento para registrarlo en la Db de movimientos */   
        const origenMovement = new MovementValue({
            typeOfMovement: 'Outflow - Transfer',
            quantity: accountDataOrigen!.balance - qty,
            IBAN: dataOwn.IBAN

        })
        const destinationMovements = new MovementValue({
            typeOfMovement: 'Income - Transfer',
            quantity: finalTransf,
            IBAN: accountDataDestination!.IBAN

        })
        const transfer = await this._movementRepository.transferMoney(balanceOrigenToUpdated, balanceDestinationToUpdated,origenMovement,destinationMovements)
        return transfer
    }
}