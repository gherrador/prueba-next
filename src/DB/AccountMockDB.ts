import { AccountEntity } from "domain/Account/Entity/AccountEntity"

export let AccountMockDB: AccountEntity[] = [
    {
        bank: "Santander",
        balance: 16000,
        IBAN: "ES123456789",
        limit_extract: 1500,
        limit_credit: 2000,
        username: "Albert Einstein",
        pin: "$2b$10$P6IETqzcynJxKSoPFtK22uaciysMQmYeoMZYJyg210KvXRwa/cTNe",
        IDCardAssociated: 123,
        cardActivated: false,
        initialPin: true
    },
    {
        bank: "BBVA",
        balance: 25000,
        IBAN: "ES987654321",
        limit_extract: 2500,
        limit_credit: 3000,
        username: "NikolaTesla",
        pin: "$2b$10$Qpk6qqyNHZIph/ec/aYQAuFn5uLdusLjxdRWIo7FiBfr5FqqKGlV.",
        IDCardAssociated: 456,
        cardActivated: false,
        initialPin: true
    }
]



export class AccountMockMethods {
    constructor() { }

    async accountMockSetterExtract(balance: number, iban: string): Promise<AccountEntity[]> {
        const accountIndex = AccountMockDB.findIndex(account => account.IBAN === iban)
        AccountMockDB[accountIndex].balance = balance
        return AccountMockDB
    }

    async accountMockSetterDebit(balance: number, iban: string): Promise<AccountEntity[]> {
        const accountIndex = AccountMockDB.findIndex(account => account.IBAN === iban)
        AccountMockDB[accountIndex].balance = balance
        return AccountMockDB
    }

    async accountMockGetter(): Promise<AccountEntity[]> {
        return AccountMockDB
    }

    async accountMockActivateCard(iban: string): Promise<boolean> {
        const accountIndex = AccountMockDB.findIndex(account => account.IBAN === iban)
        AccountMockDB[accountIndex].cardActivated = true
        return true
    }

    async accountMockChangePin(iban:string, pin:string):Promise<boolean>{
        const accountIndex = AccountMockDB.findIndex(account => account.IBAN === iban)
        AccountMockDB[accountIndex].pin = pin
        AccountMockDB[accountIndex].initialPin = false
        return true

    }
}





