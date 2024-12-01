import ServicioOrden from '../models/servicio_orden';

interface ServicioOrdenInput {
  id_ot: number;
  id_serv: number;
  desc_serv: string;
  fec_inicio_serv: Date;
  fec_ter_serv: Date;
}

export const insertarServicioOrden = async (data: ServicioOrdenInput) => {
  try {
    // Insertar el servicio en la orden de trabajo
    const servicioOrden = await ServicioOrden.create({
      id_ot: data.id_ot,
      id_serv: data.id_serv ,
      desc_serv: data.desc_serv || null, // Asignar null si no se proporciona
      fec_inicio_serv: data.fec_inicio_serv || null,
      fec_ter_serv: data.fec_ter_serv || null, // Asignar null si no se proporciona
    });

    return servicioOrden;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
