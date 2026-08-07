// Adaptado de: App.jsx (proyecto Calculadora)
// Se reutiliza el patrón useState + función manejadora (darClick) que allí controlaba la pantalla; aquí controla el estado encendido/apagado y dispara la carga de datos vía fetch al backend reutilizado.
// Se agrega un estado "cargando" mientras se obtiene la última lectura desde la base de datos, y un botón para consultar el clima manualmente, iconos y la escena de control del foco, que persiste su estado en la base de datos a través de GET/PATCH /api/dispositivos/foco.
import { useState, useEffect } from 'react';
import Bienvenida from '../components/Bienvenida';
import Indicador from '../components/Indicador';
import Boton from '../components/Boton';
import ClimaVisual from '../components/ClimaVisual';
import DeviceControl from '../components/DeviceControl';
import useSensorData from '../hooks/useSensorData';
import iconoTemperatura from '../assets/icono-temperatura.png';
import iconoHumedad from '../assets/icono-humedad.png';
import iconoVoltaje from '../assets/icono-voltaje.png';
import iconoAmperaje from '../assets/icono-amperaje.png';
import iconoPotencia from '../assets/icono-potencia.png';
import { UMBRALES_POR_DEFECTO, SIMBOLO_UNIDAD, formatearTemp, esDeNoche } from '../lib/clima';

const API_URL = 'http://localhost:3000/api/lecturas';

function Panel({ unidad = 'C', zona = 'America/Guayaquil' }) {
    const [encendido, setEncendido] = useState(false);
    const [ultimaLectura, setUltimaLectura] = useState({ temperatura: 22, humedad: 55, voltaje: 220, amperaje: 3.4 });
    const [ahora, setAhora] = useState(() => new Date());
    const { potenciaData } = useSensorData();

    useEffect(() => {
        const id = setInterval(() => setAhora(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    const manejarEstado = (valorBoton) => {
        if (valorBoton === 'ON') setEncendido(true);
        else if (valorBoton === 'OFF') setEncendido(false);
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

    // Función para consultar el clima manualmente desde el backend
    const consultarClimaManual = async () => {
        try {
            const respuesta = await fetch(`${API_URL}/clima`, { method: 'POST' });
            const datos = await respuesta.json();
            if (respuesta.ok) setUltimaLectura(datos.data);
            else alert(datos.message || 'Error al consultar el clima');
        } catch (error) {
            console.error('Error al consultar el clima manualmente:', error);
        }
    };

    const noche = esDeNoche(ahora, zona);

    const lecturas = [
        { icono: iconoTemperatura, etiqueta: 'Temperatura', valor: formatearTemp(ultimaLectura.temperatura, unidad), unidad: SIMBOLO_UNIDAD[unidad], color: 'temp' },
        { icono: iconoHumedad, etiqueta: 'Humedad', valor: ultimaLectura.humedad, unidad: ' %', color: 'hum' },
        { icono: iconoVoltaje, etiqueta: 'Voltaje', valor: ultimaLectura.voltaje, unidad: ' V', color: 'volt' },
        { icono: iconoAmperaje, etiqueta: 'Amperaje', valor: ultimaLectura.amperaje, unidad: ' A', color: 'amp' },
    ];

    return (
        <div className="panel">
            <Bienvenida nombre="Erick" />

            <div className="panel-hero">
                <ClimaVisual temperatura={ultimaLectura.temperatura} humedad={ultimaLectura.humedad} umbrales={UMBRALES_POR_DEFECTO} unidad={unidad} noche={noche} />
                <div className="panel-hero-lado">
                    <span className={`conexion-estado ${encendido ? 'conectado' : 'desconectado'}`}>
                        <span className="conexion-punto" />
                        {encendido ? 'Sensor conectado' : 'Sensor apagado'}
                    </span>

                    <div className={`estado-boton ${encendido ? 'estado-boton--on' : 'estado-boton--off'}`}>
                        <Boton valor={encendido ? 'OFF' : 'ON'} darClick={manejarEstado} />
                        <p>Estado: <strong>{encendido ? 'Encendido' : 'Apagado'}</strong></p>
                        <button className="btn-clima" onClick={consultarClimaManual}>🔄 Actualizar clima ahora</button>
                    </div>

                    {/* Control real del foco, persistido en la base de datos */}
                    <DeviceControl />
                </div>
            </div>

            <h3 className="seccion-titulo">Lecturas actuales</h3>
            <div className="panel-grid">
                {lecturas.map((l) => (
                    <div key={l.etiqueta} className={`indicador-wrapper indicador-wrapper--${l.color}`}>
                        <img src={l.icono} alt={l.etiqueta} className="indicador-icono" loading="lazy" width={512} height={512} />
                        <Indicador etiqueta={l.etiqueta} valor={l.valor} unidad={l.unidad} />
                    </div>
                ))}
                <div className="indicador-wrapper indicador-wrapper--pot">
                    <img src={iconoPotencia} alt="Potencia" className="indicador-icono" loading="lazy" width={512} height={512} />
                    <Indicador etiqueta="Potencia" valor={potenciaData?.potencia ?? 0} unidad=" W" />
                </div>
            </div>
        </div>
    );
}

export default Panel
