import { Router } from "express";
import { createUser, deleteUser, findById, getUsers, updateUser } from "../controllers/user.controller";

const userRoute = Router();

/**
 * servicio POST
 * Endpoint para crear @path/usuario/create
 */
userRoute.post("/crear", createUser);

userRoute.get("/", getUsers);

userRoute.get("/obtener/:id", findById);

userRoute.put("/actualizar", updateUser);

userRoute.delete("/eliminar/:id", deleteUser);

export default userRoute;