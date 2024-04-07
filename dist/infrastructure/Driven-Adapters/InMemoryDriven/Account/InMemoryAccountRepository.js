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
exports.InMemoryAccountRepository = void 0;
const AccountMockDB_1 = require("../../../../DB/AccountMockDB");
const AccountMockDB_2 = require("../../../../DB/AccountMockDB");
class InMemoryAccountRepository {
    constructor() { }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return data;
        });
    }
    cardActivated(iban) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new AccountMockDB_2.AccountMockMethods().accountMockActivateCard(iban);
            return "Your card has been successfully activated. For security reasons you must change your pin";
        });
    }
    ChangePin(iban, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new AccountMockDB_2.AccountMockMethods().accountMockChangePin(iban, pin);
            return "Pin changed successfully";
        });
    }
    findByIBAN(iban) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = yield AccountMockDB_1.AccountMockDB.find(account => account.IBAN === iban);
            return accountData;
        });
    }
}
exports.InMemoryAccountRepository = InMemoryAccountRepository;
