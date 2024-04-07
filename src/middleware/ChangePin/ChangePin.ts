import {Request, Response, NextFunction} from 'express'

export const changePin = async(req:Request, res:Response, next:NextFunction) => {
    
    const activated = req.session.user?.initialPin
    if(activated === false){
        next()
    }else{
        res.status(400).send("For security reasons you must change your pin")
    }

}