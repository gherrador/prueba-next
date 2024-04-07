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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encrypt {
    constructor() { }
    encrypt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
            const validPin = regex.test(password);
            if (validPin === false)
                throw new Error('Invalid Password');
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return hashedPassword;
        });
    }
    compare(passworldPlain, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(passworldPlain, hashPassword);
        });
    }
}
exports.Encrypt = Encrypt;
