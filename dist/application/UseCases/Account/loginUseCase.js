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
exports.LoginCardUseCase = void 0;
const DataAccountService_1 = require("../../../domain/Account/Service/DataAccountService");
const bcryptMidleware_1 = require("../../../utils/bcryptMidleware");
class LoginCardUseCase {
    constructor(accountRepository) {
        this._accountRepository = accountRepository;
        this._usernameExistService = DataAccountService_1.DataAccountService.instance(this._accountRepository);
    }
    run(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this._usernameExistService.run(data.IBAN);
            const dataEncrypt = new bcryptMidleware_1.Encrypt();
            const validatePin = yield dataEncrypt.compare(data.pin, userData.pin);
            if (validatePin !== true)
                throw new Error("Incorrect Password");
            const cardDataUser = {
                IBAN: data.IBAN,
                idCard: userData.IDCardAssociated,
                type: data.type,
                bank: userData.bank,
                pin: userData.pin,
                username: userData.username,
                cardActivated: userData.cardActivated,
                initialPin: userData.initialPin
            };
            const usernameLogin = yield this._accountRepository.login(cardDataUser);
            return usernameLogin;
        });
    }
}
exports.LoginCardUseCase = LoginCardUseCase;
