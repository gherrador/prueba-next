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
exports.ExtractMoneyCtrl = void 0;
class ExtractMoneyCtrl {
    constructor(extractMoneyUseCase) {
        this.extractMoneyUseCase = extractMoneyUseCase;
        this.extractMoney = this.extractMoney.bind(this);
    }
    extractMoney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AccountDataSession = req.session.user;
                const { qty, bank } = req.body;
                const balanceUpdated = yield this.extractMoneyUseCase.run(AccountDataSession, qty, bank);
                res.status(200).send(balanceUpdated);
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.ExtractMoneyCtrl = ExtractMoneyCtrl;
