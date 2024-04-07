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
exports.DataAccountService = void 0;
const DataUserNotFound_1 = require("../Exceptions/DataUserNotFound");
class DataAccountService {
    constructor(accountRepository) {
        this._accountRepository = accountRepository;
    }
    static instance(accountRepository) {
        if (!DataAccountService.INSTANCE) {
            DataAccountService.INSTANCE = new DataAccountService(accountRepository);
        }
        return DataAccountService.INSTANCE;
    }
    run(IBAN) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = yield this._accountRepository.findByIBAN(IBAN);
            if (!accountData)
                throw new DataUserNotFound_1.DataUserNotFound();
            return accountData;
        });
    }
}
exports.DataAccountService = DataAccountService;
