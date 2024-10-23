import { Request, Response} from "express";
import Usuario from "../models/usuario";
import { verificarToken, esAdmin } from "../middleware/autenticacion";

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({ msg: "No autorizado"});
        }
        if (!esAdmin(decoded)) {
            return res.status(403).json({ msg: "No tienes permisos para realizar esta acción"});
        }
        const listUsuarios = await Usuario.findAll();
        res.json(listUsuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuarios"});
    }
};


export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
          const decoded = await verificarToken(req);
          if (!decoded) {
              return res.status(401).json({ msg: "No autorizado"});
          }
          if (decoded.id_usuario.toString() !== id && !esAdmin(decoded)) {
              return res.status(403).json({ msg: "No tienes permisos para ver este usuario"});
          }

          const usuario = await Usuario.findByPk(id);
          if (usuario) {
              res.json(usuario);
          } else {
              res.status(404).json({ msg: "No existe un usuario con ese ID ${id}"});
          }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuario"});
    }
};



export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    } else {
        await usuario.destroy();
        res.json({
            msg: 'El usuario fue eliminado con éxito!'
        });
    }
};

export const postUsuario = async (req: Request, res: Response) => {
    const { rut_usuario, d_veri_usu, nom_usu,ap_usu,  email_usu, cel_usu, password, id_rol } = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo usuario sin especificar `rut_usuario`
        const newUsuario = await Usuario.create({
            rut_usuario,
            d_veri_usu,
            nom_usu,
            ap_usu, 
            email_usu,
            cel_usu,
            password,
            id_rol
        });

        res.json({
            msg: 'El usuario fue agregado con éxito!',
            usuario: newUsuario // Devuelve el nuevo usuario, incluyendo el rut_usuario generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({ msg: "No autorizado"});
        }
        if (!esAdmin(decoded)) {
            return res.status(403).json({ msg: "No tienes permisos para eliminar usuarios"});
        }
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: "No existe usuario con el ID ${id}"});
        }
        await usuario.destroy();
        res.json({ msg: "Usuario eliminado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar usuario"});
    }
};