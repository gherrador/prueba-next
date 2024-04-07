import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function loginValidation(req:Request, res:Response, next:NextFunction) {
    // create schema object
    const schemaLogin = Joi.object({
        IBAN: Joi.string().required(),
        type: Joi.string().valid('debit', 'credit'),
        pin: Joi.string().required(),
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
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}