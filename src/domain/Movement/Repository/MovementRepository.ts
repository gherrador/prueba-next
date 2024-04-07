import { balanceFinalToUpdate } from "types/types";
import { MovementEntity } from "../Entity/MovementEntity";

export interface MovementRepository{
    getMovements:(iban:string)=>Promise<MovementEntity[]>
    createMovement:(movement:MovementEntity) => Promise<MovementEntity>
    depositMoney:(data:balanceFinalToUpdate, movement:MovementEntity)=>Promise<MovementEntity>
    extractMoney:(data:balanceFinalToUpdate, movement:MovementEntity)=>Promise<MovementEntity>
    transferMoney:(Outflow:balanceFinalToUpdate, Income:balanceFinalToUpdate, movementOutflow:MovementEntity,movementIncome:MovementEntity) => Promise<MovementEntity[]>   
}