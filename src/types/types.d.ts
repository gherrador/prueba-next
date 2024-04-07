import { AccountEntity } from "../domain/Account/Entity/AccountEntity"

export declare module 'express-session' {
    interface SessionData {
        user:dataUserCard
    }
}
export type dataUserCard = {
    IBAN: string
    idCard: number
    activated: boolean
    bank: string
    type: string
    initialPin:boolean


}
export type balanceFinalToUpdate = {
    balance:number
    IBAN:string
}

export type CardAccountData = {
    IBAN: string
    idCard: number
    type: string
    bank: string
    pin: string
    username:string
    cardActivated:boolean
    initialPin:boolean

}