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
exports.LoginCtrl = void 0;
class LoginCtrl {
    constructor(loginCardUseCase) {
        this.loginCardUseCase = loginCardUseCase;
        this.loginCard = this.loginCard.bind(this);
    }
    loginCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cardData = req.body;
                const userLogin = yield this.loginCardUseCase.run(cardData);
                req.session.user = {
                    IBAN: userLogin.IBAN,
                    idCard: userLogin.idCard,
                    activated: userLogin.cardActivated,
                    bank: userLogin.bank,
                    type: userLogin.type,
                    initialPin: userLogin.initialPin
                };
                if (userLogin.cardActivated === false) {
                    res.status(200).send("Loggin Success - You must activate your card to continue");
                }
                else {
                    res.status(200).send(userLogin);
                }
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.LoginCtrl = LoginCtrl;
