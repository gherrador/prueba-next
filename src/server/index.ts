import path from 'path'
import * as dotenv from 'dotenv'
import { Server } from './server'

try{
    dotenv.config({
        path: path.resolve(__dirname, '../../.env')
    })       
    const port = process.env.PORT || 3001
    const SESSION_SECRET = process.env.SESSION_SECRET
    new Server(`${port}`, `${SESSION_SECRET}`).listen()
}catch(e){
    const error = e as Error
    console.log(error.message)
}
