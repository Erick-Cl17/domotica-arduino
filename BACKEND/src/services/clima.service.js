// Servicio que consulta la API de OpenWeatherMap y devuelve los datos en el mismo formato que usa el modelo Lectura. 
// Requiere una cuenta gratuita en https://openweathermap.org/api (API Key).
const obtenerClimaActual = async () => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const ciudad = process.env.OPENWEATHER_CITY || "Quito,EC";

    if (!apiKey) {
        throw new Error("Falta OPENWEATHER_API_KEY en el archivo .env");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        const detalle = await respuesta.text();
        throw new Error(`Error consultando OpenWeatherMap (${respuesta.status}): ${detalle}`);
    }

    const datos = await respuesta.json();

    // OpenWeatherMap no entrega voltaje/amperaje (son datos eléctricos, no climáticos). 
    // Se simulan con valores típicos de referencia hasta contar con el sensor real (Arduino) planteado como trabajo futuro.
    return {
        temperatura: datos.main.temp,
        humedad: datos.main.humidity,
        voltaje: Number((110 + Math.random() * 10).toFixed(2)),
        amperaje: Number((1 + Math.random() * 2).toFixed(2))
    };
};

module.exports = { obtenerClimaActual };
