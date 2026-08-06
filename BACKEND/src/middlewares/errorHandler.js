// Manejo centralizado de errores.
// Debe registrarse en index.js DESPUÉS de todas las rutas.
const errorHandler = (err, req, res, next) => {
    console.error("Error no controlado:", err);
    res.status(err.status || 500).json({
        ok: false,
        mensaje: "Error interno del servidor",
        error: err.message || "Error desconocido"
    });
};

module.exports = errorHandler;
