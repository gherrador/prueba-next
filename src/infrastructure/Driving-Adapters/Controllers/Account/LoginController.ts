import { LoginCardUseCase } from "../../../../application/UseCases/Account/loginUseCase"
import { Request, Response } from 'express'
export class LoginCtrl {
    constructor(private loginCardUseCase: LoginCardUseCase) {
        this.loginCard = this.loginCard.bind(this)
    }

    public async loginCard(req: Request, res: Response) {
        try {
            const cardData = req.body
            const userLogin = await this.loginCardUseCase.run(cardData)

                req.session.user = {
                    IBAN: userLogin!.IBAN,
                    idCard: userLogin!.idCard,
                    activated: userLogin!.cardActivated,
                    bank: userLogin!.bank,
                    type: userLogin!.type,
                    initialPin: userLogin!.initialPin

                }
                if (userLogin!.cardActivated === false) {
                    res.status(200).send("Loggin Success - You must activate your card to continue")
                } else {
                    res.status(200).send(userLogin)
                }
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}