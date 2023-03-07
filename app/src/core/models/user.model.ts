import { Schema, model, Document } from "mongoose";

/**
 * modelo de datos para mongo
 */
const usuarioSchema = new Schema({
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

export interface IUsuario extends Document {
  firstName: string;
  secondName: string;
  lastFirstName: string;
  lastSecondName: string;
  document: string;
  bornDate: string;
  inscriptionDate: string;
  age: number;
  Cost: number;
}


usuarioSchema.methods.toJSON = function () {
  const { __v, ...usuario } = this.toObject();
  return usuario;
};

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);