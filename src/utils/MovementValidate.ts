export class MovementValidate {
    async extractValidate(balance: number, type: string, limitExtract: number, qty: number, limitCredit: number = 0) {  
        switch(true){
            case type === 'debit':
                case balance > qty && limitExtract > qty:
                    return balance - qty                
                case balance < qty:
                    throw new Error('You dont have sufficient money in your account')
                case balance > qty && limitExtract < qty:
                    throw new Error('You cant extract more money that your limit extract')
                    
            case type === 'credit':
                case balance > qty && limitExtract > qty && limitCredit > qty:
                    return balance - qty                
                case balance > qty && limitExtract > qty && limitCredit < qty:
                    throw new Error('Cant extract this amount of money')
                case balance > qty && limitExtract < qty:
                    throw new Error('You cant extract more money that your limit extract')
                case balance < qty:
                    throw new Error('You dont have sufficient money in your account')
            default:
                throw new Error('error in type of account')               
        }      
    }

    async depositValidate(balance:number, qty:number,bankOrigen:string, bankUsed:string){
        if(bankOrigen === bankUsed){
            return balance + qty
        }else{
            throw new Error("You cannot deposit money from a bank other than your own.")
        }        
    }    
}