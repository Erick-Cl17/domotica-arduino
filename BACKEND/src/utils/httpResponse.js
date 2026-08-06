// Funciones reutilizables para respuestas HTTP consistentes.
// Se usa en los controladores nuevos (dispositivo, export) para no repetir la misma estructura de res.status(...).json(...) en cada uno. 
// No modifica los controladores ya existentes (lectura.controller.js), esos se dejan intactos.

const exito = (res, datos, mensaje = "Operación exitosa", codigo = 200) => {
    return res.status(codigo).json({
        ok: true,
        mensaje,
        data: datos
    });
};

const error = (res, mensaje = "Ocurrió un error", codigo = 500, detalle = null) => {
    return res.status(codigo).json({
        ok: false,
        mensaje,
        error: detalle
    });
};

module.exports = { exito, error };
