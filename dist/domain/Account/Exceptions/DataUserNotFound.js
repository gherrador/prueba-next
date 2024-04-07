"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUserNotFound = void 0;
class DataUserNotFound extends Error {
    constructor() {
        super("It's impossible to find a User with the entered IBAN");
    }
}
exports.DataUserNotFound = DataUserNotFound;
