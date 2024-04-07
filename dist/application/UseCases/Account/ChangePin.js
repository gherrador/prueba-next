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
exports.ChangePinUseCase = void 0;
const DataAccountService_1 = require("../../../domain/Account/Service/DataAccountService");
class ChangePinUseCase {
    constructor(accountRepository) {
        this._accountRepository = accountRepository;
        this._usernameExistService = DataAccountService_1.DataAccountService.instance(this._accountRepository);
    }
    run(iban, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this._usernameExistService.run(iban);
            const usernameLogin = yield this._accountRepository.ChangePin(userData.IBAN, pin);
            return usernameLogin;
        });
    }
}
exports.ChangePinUseCase = ChangePinUseCase;
