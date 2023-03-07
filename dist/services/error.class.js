"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants/constants");
class Error {
    constructor() { }
    static formatError(error) {
        error.message = constants_1.CONSTANTS.ERROR.FAIL;
        Object.keys(error.errors).forEach((key) => {
            if (error.errors[key].name === "CastError") {
                error.message += ` La referencia ${key} no es valida.`;
            }
            else if (error.errors[key].name === "ValidatorError" && error.errors[key].kind === "unique") {
                error.message += ` ${error.errors[key].message}.\n`;
            }
            else {
                error.message += ` ${key}, ${error.errors[key].message}.\n`;
            }
        });
        return error.message;
    }
    static formatErr(error) {
        let message = constants_1.CONSTANTS.ERROR.FAIL;
        if (error.name === "CastError") {
            message += ` La referencia ${error.path} no es valida.\n`;
        }
        if (error.codeName === "DuplicateKey") {
            Object.keys(error.keyValue).forEach(key => {
                message += ` La referencia ${key}, valor ${error.keyValue[key]} no es valida.\n`;
            });
        }
        return message;
    }
}
exports.default = Error;
