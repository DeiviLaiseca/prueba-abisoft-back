"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImgFileSystem {
    constructor() { }
    guardarImagen(file, tipo, id) {
        return new Promise((resolve, reject) => {
            // crear carpeta
            const path = this.crearDirectorioTipo(tipo);
            // nombre del archivo
            const nombre = this.generarNombre(file.name, id);
            // mover archivo chache a carpeta temp
            file.mv(`${path}/${nombre}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve({ nombre, path: `${path}/${nombre}` });
                }
            });
        });
    }
    eliminarFotos(tipo, imagen) {
        let pathFoto = path_1.default.resolve(__dirname, "../uploads/");
        pathFoto = `${pathFoto}\\${tipo}\\${imagen}`;
        if (fs_1.default.existsSync(pathFoto)) {
            fs_1.default.unlinkSync(pathFoto);
        }
    }
    getFotoUrl(tipo, imagen) {
        let pathFoto = path_1.default.resolve(__dirname, "../uploads/");
        pathFoto = `${pathFoto}\\${tipo}\\${imagen}`;
        if (fs_1.default.existsSync(pathFoto)) {
            return pathFoto;
        }
        return path_1.default.resolve(__dirname, '../assets/nofound.jpg');
    }
    generarNombre(nombreArchivo, id) {
        const nombreArr = nombreArchivo.split('.');
        const extencion = nombreArr[nombreArr.length - 1];
        const date = new Date();
        return `${id}${date.getTime()}.${extencion}`;
    }
    crearDirectorioTipo(tipo) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', tipo);
        const exist = fs_1.default.existsSync(pathUser);
        if (!exist) {
            fs_1.default.mkdirSync(pathUser);
        }
        return pathUser;
    }
}
exports.default = ImgFileSystem;
