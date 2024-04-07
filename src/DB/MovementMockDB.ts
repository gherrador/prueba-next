import { MovementEntity } from "domain/Movement/Entity/MovementEntity";

export const movementMockDB:MovementEntity[] = [
    {
        typeOfMovement: "extraction",
        quantity:1000,
        IBAN: "ES123456789"
    },
    {
        typeOfMovement: "extraction",
        quantity:1000,
        IBAN: "ES987654321"
    },{
        typeOfMovement: "extraction",
        quantity:500,
        IBAN: "ES987654321"
    }

] 