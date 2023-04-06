import * as yup from 'yup';
const infraccionSchema = yup.object().shape({
    fecha_infraccion: yup.date().required(),
    accionada_por: yup.string().required(),
    descripcion: yup.string().required(),
    valor: yup.number().required(),
    vehiculo_id: yup.number().required()
});
const vehiculoSchema = yup.object().shape({
    tipo: yup.string().required(),
    matricula_id: yup.number().required(),
});
const matriculaSchema = yup.object().shape({
    placa: yup.string().required(),
    marca: yup.string().required(),
    fecha_matricula: yup.date().required(),
    propietario_id: yup.number().required()
});
const propietarioSchema = yup.object().shape({
    nombre: yup.string().required(),
    direccion: yup.string().required(),
    tipo: yup.string().required()
});

export const schemas = {
    infraccion: infraccionSchema,
    vehiculo: vehiculoSchema,
    matricula: matriculaSchema,
    propietario: propietarioSchema
};
