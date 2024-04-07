import { movementMockDB } from "../../../../DB/MovementMockDB";
import { MovementEntity } from "domain/Movement/Entity/MovementEntity";
import { MovementRepository } from "domain/Movement/Repository/MovementRepository";
import { balanceFinalToUpdate } from "../../../../types/types";
import { AccountMockMethods } from "../../../../DB/AccountMockDB";

export class InMemoryMovementRepository implements MovementRepository {
  
    constructor() {}

    async getMovements(iban:string):Promise<MovementEntity[]>{
        const movementList = await movementMockDB.filter(movement => movement.IBAN === iban)
        return movementList        
    };
    async createMovement(movement: MovementEntity): Promise<MovementEntity>{
        movementMockDB.push(movement)
        return movement
    }
    async depositMoney(data: balanceFinalToUpdate, movement: MovementEntity): Promise<MovementEntity> {
        /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
        await new InMemoryMovementRepository().createMovement(movement)
        /**Modificamos la Bd de Account con los nuevos resultados */
        await new AccountMockMethods().accountMockSetterDebit(data.balance,data.IBAN)
        return movement
    }

    async extractMoney(data: balanceFinalToUpdate, movement: MovementEntity): Promise<MovementEntity> {
        /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
        await new InMemoryMovementRepository().createMovement(movement)
        /**Modificamos la Bd de Account con los nuevos resultados */
        await new AccountMockMethods().accountMockSetterExtract(data.balance,data.IBAN)
        return movement
    }

    async transferMoney(Outflow:balanceFinalToUpdate, Income:balanceFinalToUpdate, movementOutflow:MovementEntity,movementIncome:MovementEntity): Promise<MovementEntity[]> {
        /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
        await new InMemoryMovementRepository().createMovement(movementOutflow)
        await new InMemoryMovementRepository().createMovement(movementIncome)
        /**Modificamos la Bd de Account con los nuevos resultados */
        await new AccountMockMethods().accountMockSetterDebit(Outflow.balance,Outflow.IBAN)
        await new AccountMockMethods().accountMockSetterDebit(Income.balance,Income.IBAN)
        const movementsIncomeOutflow = [movementOutflow,movementIncome]
        return movementsIncomeOutflow
    }

}