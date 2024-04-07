"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementValue = void 0;
class MovementValue {
    constructor(movement) {
        this.typeOfMovement = movement.typeOfMovement;
        this.quantity = movement.quantity;
        this.IBAN = movement.IBAN;
    }
}
exports.MovementValue = MovementValue;
