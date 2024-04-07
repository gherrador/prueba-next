import {Request, Response, NextFunction} from 'express'

export const cardActivated = async(req:Request, res:Response, next:NextFunction) => {
    
    const activated = req.session.user?.activated
    if(activated === true){
        next()
    }else{
        res.status(400).send("Card not activated. You must activate your card to continue")
    }

}