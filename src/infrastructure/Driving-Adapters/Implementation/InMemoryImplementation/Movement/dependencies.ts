/** Importamos los repositorios */
import { InMemoryMovementRepository } from "../../../../Driven-Adapters/InMemoryDriven/Movement/InMemomyMovementRepository"
import { InMemoryAccountRepository } from "../../../../Driven-Adapters/InMemoryDriven/Account/InMemoryAccountRepository"


/**Importamos los casos de uso */
import { GetMovementUseCase } from "../../../../../application/UseCases/Movement/getMovementUseCase"
import { DepositMoneyUseCase } from "../../../../../application/UseCases/Movement/DepositMoneyUseCase"
import { ExrtactMoneyUseCase } from "../../../../../application/UseCases/Movement/extractMoneyUseCase"
import { TransferMoneyUseCase } from "../../../../../application/UseCases/Movement/transferMoneyUseCase"

/** Importamos los controladores */
import { GetMovementCtrl } from "../../../../../infrastructure/Driving-Adapters/Controllers/Movement/GetMovementCtrl"
import { DepositMoneyCtrl } from "../../../Controllers/Movement/DepositMoney"
import { ExtractMoneyCtrl } from "../../../Controllers/Movement/ExtractMoney"
import { TransferMoneyCtrl } from "../../../Controllers/Movement/TransferMoney"

/** Iniciamos el repositorio */
const movementRepository = new InMemoryMovementRepository()
const accountRepository = new InMemoryAccountRepository()



/**  Iniciamos los casos de uso */
const getMovement = new GetMovementUseCase(movementRepository)
const depositMoney = new DepositMoneyUseCase(accountRepository, movementRepository)
const extractMoney = new ExrtactMoneyUseCase(accountRepository, movementRepository)
const transferMoney = new TransferMoneyUseCase(accountRepository, movementRepository)

/** Iniciar User Controller */
export const getMovementCtrl = new GetMovementCtrl(getMovement)
export const depositMoneyCtrl = new DepositMoneyCtrl(depositMoney)
export const extractMoneyCtrl = new ExtractMoneyCtrl(extractMoney)
export const transferMoneyCtrl = new TransferMoneyCtrl(transferMoney)
