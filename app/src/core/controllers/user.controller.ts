import { Request, Response } from "express";
import { Usuario, IUsuario } from "../models/user.model";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const createUser = async (req: Request, resp: Response) => {

  const born = new Date(req.body.bornDate);
  const register = new Date(req.body.inscriptionDate); 

  if(born > register){
    return resp.status(400).json({
      Ok: false,
      error: 'fecha de registro menor a la de nacimiento',
    });
  }

  if(req.body.bornDate) {
    born.setMinutes(0);
    req.body.age = new Date().getFullYear() - born.getFullYear();
    if(req.body.age < 18) {
      return resp.status(400).json({
        Ok: false,
        error: 'La persona no es mayor de edad.',
      });
    }
  }

  if(req.body.inscriptionDate) {
    register.setMinutes(0);
    req.body.cost = (new Date().getFullYear() - register.getFullYear())*100;
    req.body.cost = req.body.cost === 0 ? 100: req.body.cost;
  }

  Usuario.create(req.body).then((usuarioDB: IUsuario) => {
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
};

export const getUsers = (req: Request, resp: Response) => {

  Usuario.find().exec(async (error, usuarios: IUsuario[]) => {
      if (error) {
        return resp.status(400).json({
          Ok: false,
          error,
        });
      }

      const total = await Usuario.count();

      return resp.status(200).json({
        Ok: true,
        total,
        result: usuarios,
      });
    });
};

export const updateUser = async (req: Request, resp: Response) => {

  const born = new Date(req.body.bornDate);
  const register = new Date(req.body.inscriptionDate); 
  if(born > register){
    return resp.status(400).json({
      Ok: false,
      error: 'fecha de registro menor a la de nacimiento',
    });
  }

  if(req.body.bornDate) {
    born.setMinutes(0);
    req.body.age = new Date().getFullYear() - born.getFullYear();
    if(req.body.age < 18) {
      return resp.status(400).json({
        Ok: false,
        error: 'La persona no es mayor de edad.',
      });
    }
  }

  if(req.body.inscriptionDate) {
    register.setMinutes(0);
    req.body.cost = (new Date().getFullYear() - register.getFullYear())*100;
    req.body.cost = req.body.cost === 0 ? 100: req.body.cost;
  }

  Usuario.findByIdAndUpdate(req.body._id, req.body, { new: true }, (error, usuarioDB) => {
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
    }
  );
};

export const findById = (req: Request, resp: Response) => {
  Usuario.findById(req.params.id).exec().then((usuario) => {
    
    if(!usuario) {
      return resp.status(404).json({
        Ok: false,
        error: 'usuario no existe',
      });
    }

    return resp.status(200).json({
      Ok: true,
      result: usuario,
    });

  }). catch(error => {
    return resp.status(400).json({
      Ok: false,
      error
    });
  });
}


export const deleteUser = async (req: Request, resp: Response) => {

  Usuario.findByIdAndRemove( req.params.id, (error: any, usuarioDB: IUsuario) => {
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
    }
  );
};
