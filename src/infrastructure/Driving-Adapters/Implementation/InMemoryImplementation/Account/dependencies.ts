/** Importamos los repositorios */
import { InMemoryAccountRepository } from "../../../../Driven-Adapters/InMemoryDriven/Account/InMemoryAccountRepository"

/**Importamos los casos de uso */
import { LoginCardUseCase } from "../../../../../application/UseCases/Account/loginUseCase"
import { ActivateCardUseCase } from "../../../../../application/UseCases/Account/ActivateCardUseCase"
import { ChangePinUseCase } from "../../../../../application/UseCases/Account/ChangePin"
/** Importamos los controladores */
import { LoginCtrl } from "../../../Controllers/Account/LoginController"
import { ActivateCardCtrl } from "../../../Controllers/Account/ActivateCard"
import { ChangePinCtrl } from "../../../Controllers/Account/ChangePin"

/** Iniciamos el repositorio */
const accountRepository = new InMemoryAccountRepository()
/**  Iniciamos los casos de uso */
const loginWithCard = new LoginCardUseCase(accountRepository)
const activateCard = new ActivateCardUseCase(accountRepository)
const changePin = new ChangePinUseCase(accountRepository)


/** Iniciar User Controller */
export const LoginCardCtrl = new LoginCtrl(loginWithCard)
export const activateCardCtrl = new ActivateCardCtrl(activateCard)
export const changePinCtrl = new ChangePinCtrl(changePin)