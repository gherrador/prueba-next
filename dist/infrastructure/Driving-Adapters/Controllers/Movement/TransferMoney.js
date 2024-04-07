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
exports.TransferMoneyCtrl = void 0;
class TransferMoneyCtrl {
    constructor(transferMoneyUseCase) {
        this.transferMoneyUseCase = transferMoneyUseCase;
        this.tansferMoney = this.tansferMoney.bind(this);
    }
    tansferMoney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { qty, iban_destination } = req.body;
                const AccountDataSession = req.session.user;
                const transfer = yield this.transferMoneyUseCase.run(AccountDataSession, qty, iban_destination);
                res.status(200).send(transfer);
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.TransferMoneyCtrl = TransferMoneyCtrl;
