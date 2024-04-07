import { changePin } from './ChangePin/ChangePin'
import { cardActivated } from './CardActivate/cardActivated'
import { userLogin } from './UserLogin/userLogin'

export const Middlewares = {
    cardActivatedMiddleware: cardActivated,
    userLoginMiddleware: userLogin,
    changePinMiddleware: changePin
}