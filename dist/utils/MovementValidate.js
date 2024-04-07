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
exports.MovementValidate = void 0;
class MovementValidate {
    extractValidate(balance_1, type_1, limitExtract_1, qty_1) {
        return __awaiter(this, arguments, void 0, function* (balance, type, limitExtract, qty, limitCredit = 0) {
            switch (true) {
                case type === 'debit':
                case balance > qty && limitExtract > qty:
                    return balance - qty;
                case balance < qty:
                    throw new Error('You dont have sufficient money in your account');
                case balance > qty && limitExtract < qty:
                    throw new Error('You cant extract more money that your limit extract');
                case type === 'credit':
                case balance > qty && limitExtract > qty && limitCredit > qty:
                    return balance - qty;
                case balance > qty && limitExtract > qty && limitCredit < qty:
                    throw new Error('Cant extract this amount of money');
                case balance > qty && limitExtract < qty:
                    throw new Error('You cant extract more money that your limit extract');
                case balance < qty:
                    throw new Error('You dont have sufficient money in your account');
                default:
                    throw new Error('error in type of account');
            }
        });
    }
    depositValidate(balance, qty, bankOrigen, bankUsed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bankOrigen === bankUsed) {
                return balance + qty;
            }
            else {
                throw new Error("You cannot deposit money from a bank other than your own.");
            }
        });
    }
}
exports.MovementValidate = MovementValidate;
