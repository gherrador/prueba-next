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
exports.GetMovementCtrl = void 0;
class GetMovementCtrl {
    constructor(getMovementUseCase) {
        this.getMovementUseCase = getMovementUseCase;
        this.movementGetList = this.movementGetList.bind(this);
    }
    movementGetList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IBAN = req.session.user.IBAN;
                const MovementList = yield this.getMovementUseCase.run(IBAN);
                if (MovementList.length > 0) {
                    res.send(MovementList);
                }
                else {
                    res.status(200).json({ movements: 'You dont have any movements' });
                }
            }
            catch (e) {
                const error = e;
                res.status(400).send(error.message);
            }
        });
    }
}
exports.GetMovementCtrl = GetMovementCtrl;
