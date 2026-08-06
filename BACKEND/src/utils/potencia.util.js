// Cálculo reutilizable de la potencia eléctrica.
// Formula del punto 6 de la guía: Potencia (W) = Voltaje (V) x Amperaje (A).
// Se calcula "al vuelo" a partir de voltaje/amperaje ya guardados en la tabla "lectura", sin necesidad de tocar la migración/tabla original ni el controlador ya reutilizado.

const calcularPotencia = (voltaje, amperaje) => {
    const v = Number(voltaje) || 0;
    const a = Number(amperaje) || 0;
    return Number((v * a).toFixed(2));
};

module.exports = { calcularPotencia };
