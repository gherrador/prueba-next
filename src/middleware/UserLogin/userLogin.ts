import {Request, Response, NextFunction} from 'express'

export const userLogin = async(req:Request, res:Response, next:NextFunction) => {    
    const activated = req.session.user

    if(activated){
        next()
    }else{
        res.status(400).send("User not logged")
    }

}