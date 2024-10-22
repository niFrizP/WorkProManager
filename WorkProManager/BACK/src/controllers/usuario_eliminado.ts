import { Request, Response } from 'express';
import UsuarioEliminado from '../models/usuario_eliminado'; // Asegúrate de tener el modelo de Usuario importado

export const getUsuarios = async (req: Request, res: Response) => {
    const listUsuarios = await UsuarioEliminado.findAll();
    res.json(listUsuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await UsuarioEliminado.findByPk(id);

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el usuario, contacta con soporte`
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await UsuarioEliminado.findByPk(id);

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
    const { rut_usu, d_verificador_usu, nom_usu,ap_usu,  correo } = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo usuario sin especificar `rut_usuario`
        const newUsuario = await UsuarioEliminado.create({
            rut_usu,
            d_verificador_usu,
            nom_usu,
            ap_usu, 
            correo // El correo es opcional
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
        const usuario = await UsuarioEliminado.findByPk(id);

        if (usuario) {
            await usuario.update(body);
            res.json({
                msg: 'El usuario fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};
