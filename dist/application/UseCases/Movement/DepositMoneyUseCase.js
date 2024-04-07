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
exports.DepositMoneyUseCase = void 0;
const DataAccountService_1 = require("../../../domain/Account/Service/DataAccountService");
const MovementValidate_1 = require("../../../utils/MovementValidate");
const MovementValue_1 = require("../../../domain/Movement/Value/MovementValue");
class DepositMoneyUseCase {
    constructor(accountRepository, movementRepository) {
        this._movementRepository = movementRepository;
        this._accountRepository = accountRepository;
        this._dataAccountService = DataAccountService_1.DataAccountService.instance(this._accountRepository);
    }
    run(data, qty, bank) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = yield this._dataAccountService.run(data.IBAN);
            /**Si se extra dinero de otro banco se abonara un 3% del dinero ingresado como comision,
             * lo que se refleja en una disminucion del 3% en el dinero ingresado */
            const movementValidate = new MovementValidate_1.MovementValidate();
            const resultValidate = yield movementValidate.depositValidate(accountData.balance, qty, accountData.bank, bank);
            const dataToUpdated = {
                balance: resultValidate,
                IBAN: accountData.IBAN,
            };
            /**Al extraer dinero debemos de crear un nuevo movimiento para registrarlo en la Db de movimientos */
            const newMovement = new MovementValue_1.MovementValue({
                typeOfMovement: 'deposit',
                quantity: resultValidate,
                IBAN: data.IBAN
            });
            const usernameLogin = yield this._movementRepository.depositMoney(dataToUpdated, newMovement);
            return usernameLogin;
        });
    }
}
exports.DepositMoneyUseCase = DepositMoneyUseCase;
