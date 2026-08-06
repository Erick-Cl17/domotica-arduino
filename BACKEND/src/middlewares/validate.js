// Reutilizado TEXTUALMENTE de: validate.js (proyecto Países)
// Middleware genérico de validación con Joi, no requiere ningún cambio.
const validate = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                mensaje: "Error de validación de datos",
                errores: errorMessages
            });
        }

        next();
    };
};
module.exports = validate;
