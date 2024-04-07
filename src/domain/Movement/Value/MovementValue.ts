import { MovementEntity } from "../Entity/MovementEntity";


export class MovementValue implements MovementEntity{
    typeOfMovement: string;
    quantity: number;
    IBAN: string;

    constructor(movement:MovementEntity){
        this.typeOfMovement = movement.typeOfMovement
        this.quantity = movement.quantity
        this.IBAN = movement.IBAN
    }
    
}