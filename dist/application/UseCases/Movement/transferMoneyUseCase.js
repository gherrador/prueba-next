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
exports.TransferMoneyUseCase = void 0;
const DataAccountService_1 = require("../../../domain/Account/Service/DataAccountService");
const MovementValue_1 = require("../../../domain/Movement/Value/MovementValue");
class TransferMoneyUseCase {
    constructor(accountRepository, movementRepository) {
        this._movementRepository = movementRepository;
        this._accountRepository = accountRepository;
        this._dataAccountService = DataAccountService_1.DataAccountService.instance(this._accountRepository);
    }
    run(dataOwn, qty, ibanDestination) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dataOwn.IBAN === ibanDestination)
                throw new Error("You can't transfer money to yourself");
            /** Both IBAN(Origen and Destination) are checked. If both IBAN exists, the operation continue, if not
             * you receibe an alert with the error */
            const accountDataOrigen = yield this._dataAccountService.run(dataOwn.IBAN);
            const accountDataDestination = yield this._dataAccountService.run(ibanDestination);
            /** We must modify both balance (Origen and Destination) and generate two movemenets */
            const balanceOrigenToUpdated = {
                balance: accountDataOrigen.balance - qty,
                IBAN: accountDataOrigen.IBAN,
            };
            const balanceDestinationToUpdated = {
                balance: accountDataDestination.balance + qty,
                IBAN: accountDataDestination.IBAN,
            };
            /** Transferring money to a bank other than yours may have fees
             * These fees are represented as a 3% reduction on the money that will reach the destination account.  */
            const finalTransf = dataOwn.bank !== accountDataDestination.bank ? qty - qty * 0.03 : qty;
            /**Al extraer dinero debemos de crear un nuevo movimiento para registrarlo en la Db de movimientos */
            const origenMovement = new MovementValue_1.MovementValue({
                typeOfMovement: 'Outflow - Transfer',
                quantity: accountDataOrigen.balance - qty,
                IBAN: dataOwn.IBAN
            });
            const destinationMovements = new MovementValue_1.MovementValue({
                typeOfMovement: 'Income - Transfer',
                quantity: finalTransf,
                IBAN: accountDataDestination.IBAN
            });
            const transfer = yield this._movementRepository.transferMoney(balanceOrigenToUpdated, balanceDestinationToUpdated, origenMovement, destinationMovements);
            return transfer;
        });
    }
}
exports.TransferMoneyUseCase = TransferMoneyUseCase;
