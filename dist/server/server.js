"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const movement_routes_1 = __importDefault(require("../infrastructure/Driving-Adapters/Routes/Movement/movement.routes"));
const account_routes_1 = __importDefault(require("../infrastructure/Driving-Adapters/Routes/Account/account.routes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor(port, SESSION_SECRET) {
        this._app = (0, express_1.default)();
        this._port = port;
        this._secret = SESSION_SECRET;
        this._app;
        this._app.use((0, express_session_1.default)({
            secret: SESSION_SECRET || "my_secret",
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 3,
            }
        }));
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use(movement_routes_1.default, account_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.listen(this._port, () => {
                console.log(`Backend App is running at http://localhost:${this._port}`);
                console.log(' Press CTRL + C to stop the server \n');
            });
        });
    }
}
exports.Server = Server;
