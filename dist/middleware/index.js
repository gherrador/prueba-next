"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
const ChangePin_1 = require("./ChangePin/ChangePin");
const cardActivated_1 = require("./CardActivate/cardActivated");
const userLogin_1 = require("./UserLogin/userLogin");
exports.Middlewares = {
    cardActivatedMiddleware: cardActivated_1.cardActivated,
    userLoginMiddleware: userLogin_1.userLogin,
    changePinMiddleware: ChangePin_1.changePin
};
