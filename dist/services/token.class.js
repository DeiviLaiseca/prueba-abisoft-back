"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants/constants");
class Token {
    constructor() { }
    /**
     * Genera un token, basado en la semilla y usuario, con una caducidad de 1 dias
     * @param payload
     */
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({ usuario: payload }, this.seed, {
            expiresIn: this.caducidad,
        });
    }
    /**
     * Valida si el token ingresado es valido y retorna una promesa
     * @param usuarioToken
     */
    static validarToken(usuarioToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(usuarioToken, this.seed, (error, decoded) => {
                if (error) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = constants_1.CONSTANTS.TOKEN_CRYPT;
Token.caducidad = "1d";
