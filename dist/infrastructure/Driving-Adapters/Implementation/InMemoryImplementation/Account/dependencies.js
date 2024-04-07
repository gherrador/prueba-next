"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePinCtrl = exports.activateCardCtrl = exports.LoginCardCtrl = void 0;
/** Importamos los repositorios */
const InMemoryAccountRepository_1 = require("../../../../Driven-Adapters/InMemoryDriven/Account/InMemoryAccountRepository");
/**Importamos los casos de uso */
const loginUseCase_1 = require("../../../../../application/UseCases/Account/loginUseCase");
const ActivateCardUseCase_1 = require("../../../../../application/UseCases/Account/ActivateCardUseCase");
const ChangePin_1 = require("../../../../../application/UseCases/Account/ChangePin");
/** Importamos los controladores */
const LoginController_1 = require("../../../Controllers/Account/LoginController");
const ActivateCard_1 = require("../../../Controllers/Account/ActivateCard");
const ChangePin_2 = require("../../../Controllers/Account/ChangePin");
/** Iniciamos el repositorio */
const accountRepository = new InMemoryAccountRepository_1.InMemoryAccountRepository();
/**  Iniciamos los casos de uso */
const loginWithCard = new loginUseCase_1.LoginCardUseCase(accountRepository);
const activateCard = new ActivateCardUseCase_1.ActivateCardUseCase(accountRepository);
const changePin = new ChangePin_1.ChangePinUseCase(accountRepository);
/** Iniciar User Controller */
exports.LoginCardCtrl = new LoginController_1.LoginCtrl(loginWithCard);
exports.activateCardCtrl = new ActivateCard_1.ActivateCardCtrl(activateCard);
exports.changePinCtrl = new ChangePin_2.ChangePinCtrl(changePin);
