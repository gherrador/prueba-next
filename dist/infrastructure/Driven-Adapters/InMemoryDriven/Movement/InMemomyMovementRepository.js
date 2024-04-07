"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMovementRepository = void 0;
const MovementMockDB_1 = require("../../../../DB/MovementMockDB");
const AccountMockDB_1 = require("../../../../DB/AccountMockDB");
class InMemoryMovementRepository {
    constructor() { }
    getMovements(iban) {
        return __awaiter(this, void 0, void 0, function* () {
            const movementList = yield MovementMockDB_1.movementMockDB.filter(movement => movement.IBAN === iban);
            return movementList;
        });
    }
    ;
    createMovement(movement) {
        return __awaiter(this, void 0, void 0, function* () {
            MovementMockDB_1.movementMockDB.push(movement);
            return movement;
        });
    }
    depositMoney(data, movement) {
        return __awaiter(this, void 0, void 0, function* () {
            /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
            yield new InMemoryMovementRepository().createMovement(movement);
            /**Modificamos la Bd de Account con los nuevos resultados */
            yield new AccountMockDB_1.AccountMockMethods().accountMockSetterDebit(data.balance, data.IBAN);
            return movement;
        });
    }
    extractMoney(data, movement) {
        return __awaiter(this, void 0, void 0, function* () {
            /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
            yield new InMemoryMovementRepository().createMovement(movement);
            /**Modificamos la Bd de Account con los nuevos resultados */
            yield new AccountMockDB_1.AccountMockMethods().accountMockSetterExtract(data.balance, data.IBAN);
            return movement;
        });
    }
    transferMoney(Outflow, Income, movementOutflow, movementIncome) {
        return __awaiter(this, void 0, void 0, function* () {
            /**Creamos el nuevo movimiento en la Db. Al encontrars en el mismo nivel, podemos establecer la comunicacion entre ellos */
            yield new InMemoryMovementRepository().createMovement(movementOutflow);
            yield new InMemoryMovementRepository().createMovement(movementIncome);
            /**Modificamos la Bd de Account con los nuevos resultados */
            yield new AccountMockDB_1.AccountMockMethods().accountMockSetterDebit(Outflow.balance, Outflow.IBAN);
            yield new AccountMockDB_1.AccountMockMethods().accountMockSetterDebit(Income.balance, Income.IBAN);
            const movementsIncomeOutflow = [movementOutflow, movementIncome];
            return movementsIncomeOutflow;
        });
    }
}
exports.InMemoryMovementRepository = InMemoryMovementRepository;
