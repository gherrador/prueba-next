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
exports.ChangePinCtrl = void 0;
const bcryptMidleware_1 = require("../../../../utils/bcryptMidleware");
class ChangePinCtrl {
    constructor(changePinUseCase) {
        this.changePinUseCase = changePinUseCase;
        this.changePin = this.changePin.bind(this);
    }
    changePin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IBAN, pin } = req.body;
                const dataEncrypt = new bcryptMidleware_1.Encrypt();
                const hashPin = yield dataEncrypt.encrypt(pin);
                const changePin = yield this.changePinUseCase.run(IBAN, hashPin);
                req.session.user.initialPin = false;
                res.status(200).send(changePin);
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.ChangePinCtrl = ChangePinCtrl;
