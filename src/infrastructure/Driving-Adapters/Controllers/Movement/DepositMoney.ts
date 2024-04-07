import { DepositMoneyUseCase } from "../../../../application/UseCases/Movement/DepositMoneyUseCase"
import { Request, Response } from 'express'

export class DepositMoneyCtrl {
    constructor(private depositMoneyUseCase: DepositMoneyUseCase) {
        this.depositMoney = this.depositMoney.bind(this)
    }

    public async depositMoney(req: Request, res: Response) {
        try {
            const AccountDataSession = req.session.user!            
            const { qty, bank } = req.body
            const balanceUpdated = await this.depositMoneyUseCase.run(AccountDataSession, qty, bank)
                res.status(200).send(balanceUpdated)
            
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}