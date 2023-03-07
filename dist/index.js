"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environments_1 = require("./environments/environments");
const server_class_1 = __importDefault(require("./server/server.class"));
const server = new server_class_1.default();
server.middleware();
//----------------------MIDLEWARE BODY PARSER-----------------------//
server.configBodyParser();
//----------------------CONFIGURACIÓN DE CORS----------------------//
server.configCors();
//----------------------RUTAS DE LA APLICACIÓN-----------------------//
server.configRoutes();
console.clear();
//-------------------------CONEXIÓN MONGO DB--------------------------//
mongoose_1.default.connect(environments_1.environment.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Error de conexión BD');
    }
    ;
    console.log('DB conected...');
});
//------------------------LEVANTA EL SERVIDOR-------------------------//
server.start(() => {
    console.log('Server RUN in ', server.port);
});
