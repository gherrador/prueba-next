import express from 'express'
import session from 'express-session';
import movementRouter from '../infrastructure/Driving-Adapters/Routes/Movement/movement.routes'
import accountRouter from '../infrastructure/Driving-Adapters/Routes/Account/account.routes'
import cors from 'cors'

export class Server {
    private readonly _port: string
    private readonly _app: express.Express = express()
    private readonly _secret: string
    

    constructor(port: string, SESSION_SECRET:string) {
        this._port = port
        this._secret = SESSION_SECRET
        this._app
        this._app.use(
            session({
                secret: SESSION_SECRET || "my_secret",
                resave: true,
                saveUninitialized: true,
                cookie: {
                    secure: false,
                    maxAge: 1000 * 60 * 60 * 3,
                }
            })
        )
        this._app.use(cors())
        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(movementRouter,accountRouter)

    }

    async listen(): Promise<void> {
        this._app.listen(this._port, () => {
            console.log(`Backend App is running at http://localhost:${this._port}`)
            console.log(' Press CTRL + C to stop the server \n')
        })
    }
}
