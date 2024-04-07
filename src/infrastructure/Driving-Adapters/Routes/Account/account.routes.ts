import { Router } from "express";
import { Middlewares } from "../../../../middleware";
import { LoginCardCtrl, activateCardCtrl,changePinCtrl } from "../../Implementation/InMemoryImplementation/Account/dependencies"
import { loginValidation } from "../../../../Schema/loginSchemaValidator/loginValidator";
export const accountRouter = Router()


accountRouter.post('/login/',loginValidation,LoginCardCtrl.loginCard)
accountRouter.put('/activate/',Middlewares.userLoginMiddleware,activateCardCtrl.activateCard)
accountRouter.put('/changepin/',Middlewares.userLoginMiddleware, Middlewares.cardActivatedMiddleware,changePinCtrl.changePin)
export default accountRouter