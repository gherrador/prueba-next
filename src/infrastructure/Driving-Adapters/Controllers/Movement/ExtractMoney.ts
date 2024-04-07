import { ExrtactMoneyUseCase } from "../../../../application/UseCases/Movement/extractMoneyUseCase"
import { Request, Response } from 'express'

export class ExtractMoneyCtrl {
    constructor(private extractMoneyUseCase: ExrtactMoneyUseCase) {
        this.extractMoney = this.extractMoney.bind(this)
    }

    public async extractMoney(req: Request, res: Response) {
        try {
            const AccountDataSession = req.session.user!            
            const { qty, bank } = req.body
            const balanceUpdated = await this.extractMoneyUseCase.run(AccountDataSession, qty, bank)
                res.status(200).send(balanceUpdated)
            
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}