import { Request, Response } from 'express'
import { Encrypt } from "../../../../utils/bcryptMidleware"
import { ChangePinUseCase } from "../../../../application/UseCases/Account/ChangePin"

export class ChangePinCtrl {
    constructor(private changePinUseCase: ChangePinUseCase) {
        this.changePin = this.changePin.bind(this)
    }

    public async changePin(req: Request, res: Response) {
        try {
            const { IBAN, pin } = req.body
            const dataEncrypt = new Encrypt()
            const hashPin = await dataEncrypt.encrypt(pin)
            const changePin = await this.changePinUseCase.run(IBAN, hashPin)
                req.session.user!.initialPin = false     
                res.status(200).send(changePin)
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}