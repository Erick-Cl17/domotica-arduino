// Middleware para rutas que no existen (404).
// Debe registrarse en index.js después de las rutas y antes de errorHandler.
const notFound = (req, res, next) => {
    res.status(404).json({
        ok: false,
        mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
};

module.exports = notFound;
