import { Router } from "express";
import { getMovementCtrl, depositMoneyCtrl, extractMoneyCtrl,transferMoneyCtrl } from "../../Implementation/InMemoryImplementation/Movement/dependencies";
import { Middlewares } from "../../../../middleware";

export const movementRouter = Router()

movementRouter.get('/movements/',Middlewares.userLoginMiddleware,Middlewares.cardActivatedMiddleware,Middlewares.changePinMiddleware,getMovementCtrl.movementGetList)
movementRouter.post('/deposit/',Middlewares.userLoginMiddleware,Middlewares.cardActivatedMiddleware,Middlewares.changePinMiddleware,depositMoneyCtrl.depositMoney)
movementRouter.post('/extract/',Middlewares.userLoginMiddleware,Middlewares.cardActivatedMiddleware,Middlewares.changePinMiddleware,extractMoneyCtrl.extractMoney)
movementRouter.post('/transfer/',Middlewares.userLoginMiddleware,Middlewares.cardActivatedMiddleware,Middlewares.changePinMiddleware,transferMoneyCtrl.tansferMoney)


export default movementRouter