import { MovementEntity } from "../../../domain/Movement/Entity/MovementEntity";
import { MovementRepository } from "../../../domain/Movement/Repository/MovementRepository";


export class GetMovementUseCase{
    private readonly _movementRepository: MovementRepository

    constructor(movementRepository:MovementRepository){
        this._movementRepository = movementRepository
    }

    async run(iban:string):Promise<MovementEntity[]>{                    
        const movementList = await this._movementRepository.getMovements(iban)       
        return movementList
    }
}