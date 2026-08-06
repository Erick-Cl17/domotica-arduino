// Adaptado de: pais.validator.js (proyecto Países)
// Se reutiliza la misma estructura de esquemas Joi (objeto .min(1) para actualizaciones parciales, idParamSchema idéntico) cambiando los campos por los propios de una lectura de sensores.
const Joi = require('joi');

// Esquema para insertar una lectura completa (POST)
const insertarLecturaSchema = Joi.object({
    temperatura: Joi.number().min(-50).max(100).required().messages({
        "number.base": "La temperatura debe ser un número.",
        "any.required": "La temperatura es obligatoria."
    }),
    humedad: Joi.number().min(0).max(100).required().messages({
        "number.base": "La humedad debe ser un número.",
        "any.required": "La humedad es obligatoria."
    }),
    voltaje: Joi.number().min(0).max(500).required().messages({
        "number.base": "El voltaje debe ser un número.",
        "any.required": "El voltaje es obligatorio."
    }),
    amperaje: Joi.number().min(0).max(100).required().messages({
        "number.base": "El amperaje debe ser un número.",
        "any.required": "El amperaje es obligatorio."
    })
});

// Esquema para actualizar parcialmente (PATCH) - igual patrón que updatePaisSchema
const patchLecturaSchema = Joi.object({
    temperatura: Joi.number().min(-50).max(100),
    humedad: Joi.number().min(0).max(100),
    voltaje: Joi.number().min(0).max(500),
    amperaje: Joi.number().min(0).max(100)
}).min(1); // Al menos un campo debe ser enviado para actualizar

// Esquema para actualizar completamente (PUT) - todos los campos obligatorios
const putLecturaSchema = Joi.object({
    temperatura: Joi.number().min(-50).max(100).required(),
    humedad: Joi.number().min(0).max(100).required(),
    voltaje: Joi.number().min(0).max(500).required(),
    amperaje: Joi.number().min(0).max(100).required()
});

// Esquema para validar parámetros de la URL (id) - REUTILIZADO 
const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": "El ID debe ser un número.",
        "number.positive": "El ID debe ser un número positivo."
    })
});

module.exports = {
    insertarLecturaSchema,
    patchLecturaSchema,
    putLecturaSchema,
    idParamSchema
}
