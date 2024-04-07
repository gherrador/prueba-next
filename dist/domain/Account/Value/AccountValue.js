"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountValue = void 0;
class AccountValue {
    constructor(data) {
        this.bank = data.bank;
        this.balance = data.balance;
        this.IBAN = data.IBAN;
        this.limit_extract = data.limit_extract;
        this.limit_credit = data.limit_credit;
        this.username = data.username;
        this.pin = data.pin;
        this.IDCardAssociated = data.IDCardAssociated;
        this.cardActivated = false;
        this.initialPin = false;
    }
}
exports.AccountValue = AccountValue;
