"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRoute = (0, express_1.Router)();
/**
 * servicio POST
 * Endpoint para crear @path/usuario/create
 */
userRoute.post("/crear", user_controller_1.createUser);
userRoute.get("/", user_controller_1.getUsers);
userRoute.get("/obtener/:id", user_controller_1.findById);
userRoute.put("/actualizar", user_controller_1.updateUser);
userRoute.delete("/eliminar/:id", user_controller_1.deleteUser);
exports.default = userRoute;
