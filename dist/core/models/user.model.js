"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
/**
 * modelo de datos para mongo
 */
const usuarioSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'El campo del modelo es requerido'],
    },
    secondName: {
        type: String,
    },
    lastFirstName: {
        type: String,
        required: [true, 'El campo del modelo es requerido'],
    },
    lastSecondName: {
        type: String,
    },
    document: {
        type: String,
        unique: true,
        required: [true, 'El campo del modelo es requerido'],
    },
    bornDate: {
        type: String,
        required: [true, 'El campo del modelo es requerido'],
    },
    inscriptionDate: {
        type: String,
        required: [true, 'El campo del modelo es requerido'],
    },
    age: {
        type: Number,
        required: [true, 'El campo del modelo es requerido'],
    },
    cost: {
        type: Number,
        required: [true, 'El campo del modelo es requerido'],
    }
});
usuarioSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, usuario = __rest(_a, ["__v"]);
    return usuario;
};
exports.Usuario = (0, mongoose_1.model)("Usuario", usuarioSchema);
