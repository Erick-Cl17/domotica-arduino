// Validación Joi para el cambio de estado del foco.
// Mismo estilo que lectura.validator.js (mensajes personalizados con .messages()).
const Joi = require("joi");

// PATCH /api/dispositivos/foco  { "estado": true | false }
const cambiarEstadoSchema = Joi.object({
    estado: Joi.boolean().required().messages({
        "boolean.base": "El estado del foco debe ser verdadero o falso.",
        "any.required": "El estado del foco es obligatorio."
    })
});

module.exports = { cambiarEstadoSchema };
