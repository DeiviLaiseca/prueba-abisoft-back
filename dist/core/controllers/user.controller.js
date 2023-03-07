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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findById = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
/**
 *
 * @param req
 * @param res
 * @returns
 */
const createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const born = new Date(req.body.bornDate);
    const register = new Date(req.body.inscriptionDate);
    if (born > register) {
        return resp.status(400).json({
            Ok: false,
            error: 'fecha de registro menor a la de nacimiento',
        });
    }
    if (req.body.bornDate) {
        born.setMinutes(0);
        req.body.age = new Date().getFullYear() - born.getFullYear();
        if (req.body.age < 18) {
            return resp.status(400).json({
                Ok: false,
                error: 'La persona no es mayor de edad.',
            });
        }
    }
    if (req.body.inscriptionDate) {
        register.setMinutes(0);
        req.body.cost = (new Date().getFullYear() - register.getFullYear()) * 100;
        req.body.cost = req.body.cost === 0 ? 100 : req.body.cost;
    }
    user_model_1.Usuario.create(req.body).then((usuarioDB) => {
        return resp.status(200).json({
            Ok: true,
            result: usuarioDB,
        });
    })
        .catch((error) => {
        return resp.status(400).json({
            Ok: false,
            error,
        });
    });
});
exports.createUser = createUser;
const getUsers = (req, resp) => {
    user_model_1.Usuario.find().exec((error, usuarios) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return resp.status(400).json({
                Ok: false,
                error,
            });
        }
        const total = yield user_model_1.Usuario.count();
        return resp.status(200).json({
            Ok: true,
            total,
            result: usuarios,
        });
    }));
};
exports.getUsers = getUsers;
const updateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const born = new Date(req.body.bornDate);
    const register = new Date(req.body.inscriptionDate);
    if (born > register) {
        return resp.status(400).json({
            Ok: false,
            error: 'fecha de registro menor a la de nacimiento',
        });
    }
    if (req.body.bornDate) {
        born.setMinutes(0);
        req.body.age = new Date().getFullYear() - born.getFullYear();
        if (req.body.age < 18) {
            return resp.status(400).json({
                Ok: false,
                error: 'La persona no es mayor de edad.',
            });
        }
    }
    if (req.body.inscriptionDate) {
        register.setMinutes(0);
        req.body.cost = (new Date().getFullYear() - register.getFullYear()) * 100;
        req.body.cost = req.body.cost === 0 ? 100 : req.body.cost;
    }
    user_model_1.Usuario.findByIdAndUpdate(req.body._id, req.body, { new: true }, (error, usuarioDB) => {
        if (error) {
            return resp.status(400).json({
                Ok: false,
                error,
            });
        }
        if (!usuarioDB) {
            return resp.status(404).json({
                Ok: false,
                result: 'El usuario no existe'
            });
        }
        return resp.status(200).json({
            Ok: true,
            result: usuarioDB,
        });
    });
});
exports.updateUser = updateUser;
const findById = (req, resp) => {
    user_model_1.Usuario.findById(req.params.id).exec().then((usuario) => {
        if (!usuario) {
            return resp.status(404).json({
                Ok: false,
                error: 'usuario no existe',
            });
        }
        return resp.status(200).json({
            Ok: true,
            result: usuario,
        });
    }).catch(error => {
        return resp.status(400).json({
            Ok: false,
            error
        });
    });
};
exports.findById = findById;
const deleteUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.Usuario.findByIdAndRemove(req.params.id, (error, usuarioDB) => {
        if (error) {
            return resp.status(400).json({
                ok: false,
                error,
            });
        }
        if (!usuarioDB) {
            return resp.status(404).json({
                Ok: false,
                result: 'El usuario no existe'
            });
        }
        return resp.status(200).json({
            Ok: true,
            result: 'Usuario eliminado exitosamente'
        });
    });
});
exports.deleteUser = deleteUser;
