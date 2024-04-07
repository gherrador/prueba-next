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
exports.changePin = void 0;
const changePin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const activated = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.initialPin;
    if (activated === false) {
        next();
    }
    else {
        res.status(400).send("For security reasons you must change your pin");
    }
});
exports.changePin = changePin;
