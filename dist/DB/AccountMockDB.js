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
exports.AccountMockMethods = exports.AccountMockDB = void 0;
exports.AccountMockDB = [
    {
        bank: "Santander",
        balance: 16000,
        IBAN: "ES123456789",
        limit_extract: 1500,
        limit_credit: 2000,
        username: "Albert Einstein",
        pin: "$2b$10$P6IETqzcynJxKSoPFtK22uaciysMQmYeoMZYJyg210KvXRwa/cTNe",
        IDCardAssociated: 123,
        cardActivated: false,
        initialPin: true
    },
    {
        bank: "BBVA",
        balance: 25000,
        IBAN: "ES987654321",
        limit_extract: 2500,
        limit_credit: 3000,
        username: "NikolaTesla",
        pin: "$2b$10$Qpk6qqyNHZIph/ec/aYQAuFn5uLdusLjxdRWIo7FiBfr5FqqKGlV.",
        IDCardAssociated: 456,
        cardActivated: false,
        initialPin: true
    }
];
class AccountMockMethods {
    constructor() { }
    accountMockSetterExtract(balance, iban) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountIndex = exports.AccountMockDB.findIndex(account => account.IBAN === iban);
            exports.AccountMockDB[accountIndex].balance = balance;
            return exports.AccountMockDB;
        });
    }
    accountMockSetterDebit(balance, iban) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountIndex = exports.AccountMockDB.findIndex(account => account.IBAN === iban);
            exports.AccountMockDB[accountIndex].balance = balance;
            return exports.AccountMockDB;
        });
    }
    accountMockGetter() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.AccountMockDB;
        });
    }
    accountMockActivateCard(iban) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountIndex = exports.AccountMockDB.findIndex(account => account.IBAN === iban);
            exports.AccountMockDB[accountIndex].cardActivated = true;
            return true;
        });
    }
    accountMockChangePin(iban, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountIndex = exports.AccountMockDB.findIndex(account => account.IBAN === iban);
            exports.AccountMockDB[accountIndex].pin = pin;
            exports.AccountMockDB[accountIndex].initialPin = false;
            return true;
        });
    }
}
exports.AccountMockMethods = AccountMockMethods;
