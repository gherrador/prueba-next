"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferMoneyCtrl = exports.extractMoneyCtrl = exports.depositMoneyCtrl = exports.getMovementCtrl = void 0;
/** Importamos los repositorios */
const InMemomyMovementRepository_1 = require("../../../../Driven-Adapters/InMemoryDriven/Movement/InMemomyMovementRepository");
const InMemoryAccountRepository_1 = require("../../../../Driven-Adapters/InMemoryDriven/Account/InMemoryAccountRepository");
/**Importamos los casos de uso */
const getMovementUseCase_1 = require("../../../../../application/UseCases/Movement/getMovementUseCase");
const DepositMoneyUseCase_1 = require("../../../../../application/UseCases/Movement/DepositMoneyUseCase");
const extractMoneyUseCase_1 = require("../../../../../application/UseCases/Movement/extractMoneyUseCase");
const transferMoneyUseCase_1 = require("../../../../../application/UseCases/Movement/transferMoneyUseCase");
/** Importamos los controladores */
const GetMovementCtrl_1 = require("../../../../../infrastructure/Driving-Adapters/Controllers/Movement/GetMovementCtrl");
const DepositMoney_1 = require("../../../Controllers/Movement/DepositMoney");
const ExtractMoney_1 = require("../../../Controllers/Movement/ExtractMoney");
const TransferMoney_1 = require("../../../Controllers/Movement/TransferMoney");
/** Iniciamos el repositorio */
const movementRepository = new InMemomyMovementRepository_1.InMemoryMovementRepository();
const accountRepository = new InMemoryAccountRepository_1.InMemoryAccountRepository();
/**  Iniciamos los casos de uso */
const getMovement = new getMovementUseCase_1.GetMovementUseCase(movementRepository);
const depositMoney = new DepositMoneyUseCase_1.DepositMoneyUseCase(accountRepository, movementRepository);
const extractMoney = new extractMoneyUseCase_1.ExrtactMoneyUseCase(accountRepository, movementRepository);
const transferMoney = new transferMoneyUseCase_1.TransferMoneyUseCase(accountRepository, movementRepository);
/** Iniciar User Controller */
exports.getMovementCtrl = new GetMovementCtrl_1.GetMovementCtrl(getMovement);
exports.depositMoneyCtrl = new DepositMoney_1.DepositMoneyCtrl(depositMoney);
exports.extractMoneyCtrl = new ExtractMoney_1.ExtractMoneyCtrl(extractMoney);
exports.transferMoneyCtrl = new TransferMoney_1.TransferMoneyCtrl(transferMoney);
