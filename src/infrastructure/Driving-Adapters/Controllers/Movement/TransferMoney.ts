import { TransferMoneyUseCase } from "../../../../application/UseCases/Movement/transferMoneyUseCase"
import { Request, Response } from 'express'

export class TransferMoneyCtrl {
    constructor(private transferMoneyUseCase: TransferMoneyUseCase) {
        this.tansferMoney = this.tansferMoney.bind(this)
    }

    public async tansferMoney(req: Request, res: Response) {        
        try {
            const { qty, iban_destination } = req.body
            const AccountDataSession = req.session.user!
            const transfer = await this.transferMoneyUseCase.run(AccountDataSession, qty, iban_destination)
                res.status(200).send(transfer)
            
        } catch (e) {
            const error = e as Error
            res.status(400).send(error.message)
        }
    }
}