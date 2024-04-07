import { ActivateCardUseCase } from "../../../../application/UseCases/Account/ActivateCardUseCase"
import { Request, Response } from 'express'

export class ActivateCardCtrl {
    constructor(private activateCardUseCase: ActivateCardUseCase) {
        this.activateCard = this.activateCard.bind(this)
    }

    public async activateCard(req: Request, res: Response) {
        try {
            const { IBAN } = req.body
            const activateCard = await this.activateCardUseCase.run(IBAN)
                req.session.user!.activated = true     
                res.status(200).send(activateCard)
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}