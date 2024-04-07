"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function loginValidation(req, res, next) {
    // create schema object
    const schemaLogin = joi_1.default.object({
        IBAN: joi_1.default.string().required(),
        type: joi_1.default.string().valid('debit', 'credit'),
        pin: joi_1.default.string().required(),
    });
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    // validate request body against schema
    const { error, value } = schemaLogin.validate(req.body, options);
    if (error) {
        // on fail return comma separated errors
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}
exports.loginValidation = loginValidation;
