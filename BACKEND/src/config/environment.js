// Configuración centralizada de variables de entorno.

require("dotenv").config();

module.exports = {
    puerto: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    clima: {
        apiKey: process.env.OPENWEATHER_API_KEY,
        ciudad: process.env.OPENWEATHER_CITY || "Quito,EC",
        intervaloMinutos: Number(process.env.CLIMA_INTERVALO_MINUTOS) || 10
    }
};
