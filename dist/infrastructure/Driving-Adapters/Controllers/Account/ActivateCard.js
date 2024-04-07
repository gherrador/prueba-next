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
exports.ActivateCardCtrl = void 0;
class ActivateCardCtrl {
    constructor(activateCardUseCase) {
        this.activateCardUseCase = activateCardUseCase;
        this.activateCard = this.activateCard.bind(this);
    }
    activateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IBAN } = req.body;
                const activateCard = yield this.activateCardUseCase.run(IBAN);
                req.session.user.activated = true;
                res.status(200).send(activateCard);
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.ActivateCardCtrl = ActivateCardCtrl;
