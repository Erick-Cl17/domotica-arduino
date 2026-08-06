// Adaptado de: App.jsx (proyecto Calculadora)
// Se reutiliza el patrón useState + función manejadora (darClick) que allí controlaba la pantalla; aquí controla el estado encendido/apagado y dispara la carga de datos vía fetch al backend reutilizado.
import { useState, useEffect } from 'react';
import Bienvenida from '../components/Bienvenida';
import Indicador from '../components/Indicador';
import Boton from '../components/Boton';

const API_URL = 'http://localhost:3000/api/lecturas';

function Panel() {
    const [encendido, setEncendido] = useState(false);
    const [ultimaLectura, setUltimaLectura] = useState({
        temperatura: 0,
        humedad: 0,
        voltaje: 0,
        amperaje: 0
    });

    const manejarEstado = (valorBoton) => {
        // mismo patrón de manejador de Calculadora: recibe el "valor" del Boton y decide qué hacer según su contenido
        if (valorBoton === 'ON') {
            setEncendido(true);
        } else if (valorBoton === 'OFF') {
            setEncendido(false);
        }
    };

    const cargarUltimaLectura = async () => {
        try {
            const respuesta = await fetch(`${API_URL}/ultima`);
            const datos = await respuesta.json();
            if (datos && datos.id) setUltimaLectura(datos);
        } catch (error) {
            console.error('Error al cargar la última lectura:', error);
        }
    };

    useEffect(() => {
        if (encendido) {
            cargarUltimaLectura();
            const intervalo = setInterval(cargarUltimaLectura, 5000);
            return () => clearInterval(intervalo);
        }
    }, [encendido]);

    // Función para consultar el clima manualmente
    const consultarClimaManual = async () => {
        try {
            const respuesta = await fetch(`${API_URL}/clima`, { method: 'POST' });
            const datos = await respuesta.json();
            if (respuesta.ok) {
                setUltimaLectura(datos.data);
            } else {
                alert(datos.message || 'Error al consultar el clima');
            }
        } catch (error) {
            console.error('Error al consultar el clima manualmente:', error);
        }
    };


return (
        <div className="panel">
            <Bienvenida nombre="Erick" />

            <div className="estado-boton">
                <Boton valor={encendido ? 'OFF' : 'ON'} darClick={manejarEstado} />
                <p>Estado: {encendido ? 'Encendido' : 'Apagado'}</p>
                <button onClick={consultarClimaManual}>Actualizar clima ahora</button>
            </div>

            <div className="panel-grid">
                <Indicador etiqueta="🌡️Temperatura" valor={ultimaLectura.temperatura} unidad=" °C" />
                <Indicador etiqueta="💧Humedad" valor={ultimaLectura.humedad} unidad=" %" />
                <Indicador etiqueta="⚡Voltaje" valor={ultimaLectura.voltaje} unidad=" V" />
                <Indicador etiqueta="🔋Amperaje" valor={ultimaLectura.amperaje} unidad=" A" />
            </div>
        </div>
    );
}

export default Panel
