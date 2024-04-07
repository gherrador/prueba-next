import { GetMovementUseCase } from "../../../../application/UseCases/Movement/getMovementUseCase"
import {Request, Response} from 'express'

export class GetMovementCtrl{
    constructor(private getMovementUseCase:GetMovementUseCase){
        this.movementGetList = this.movementGetList.bind(this)
    }

    public async movementGetList(req:Request, res:Response){
        try{            
            const IBAN = req.session.user!.IBAN           
            const MovementList = await this.getMovementUseCase.run(IBAN)
            if(MovementList.length > 0){
                res.send(MovementList)

            }else{
                res.status(200).json({movements:'You dont have any movements'})
            }
        }catch(e){
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}