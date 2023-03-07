"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("../core/routes/user.route"));
class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        // inicializa dependecia de express
        this.app = (0, express_1.default)();
    }
    middleware() {
        this.app.use(express_1.default.static('public'));
    }
    configBodyParser() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
    }
    configCors() {
        this.app.use((0, cors_1.default)({ origin: true, credentials: true }));
    }
    configRoutes() {
        this.app.use('/usuario', user_route_1.default);
    }
    /**
     * Función que escucha las peticiones realizadas al puerto, y ejecuta un callback de tipo Funtion
     * @param callback
     */
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
