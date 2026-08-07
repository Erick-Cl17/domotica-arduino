// Adaptado de: App.jsx (proyecto Calculadora) + Boton.jsx reutilizado para los botones de filtro (mismo patrón valor/darClick).
// La tabla y gráfico son nuevos, requeridos por el proyecto de Estación de Monitoreo (no existían en los proyectos originales).
// Se agregan filtros de fecha, cantidad máxima y tipo de medición, y botones para exportar a Excel, CSV, JSON y PDF.
// Adaptado de: App.jsx (proyecto Calculadora) + Boton.jsx reutilizado para los filtros.
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Boton from '../components/Boton';
import ModalExportar from '../components/ModalExportar';

const API_URL = 'http://localhost:3000/api/lecturas';

function Historial() {
    const [lecturas, setLecturas] = useState([]);
    const [rango, setRango] = useState(7);

    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cantidadMaxima, setCantidadMaxima] = useState('');

    const [modalExportar, setModalExportar] = useState(false);

    const cargarHistorial = async (dias) => {
        try {
            const respuesta = await fetch(`${API_URL}?dias=${dias}`);
            const datos = await respuesta.json();
            setLecturas(datos);
        } catch (error) {
            console.error('Error al cargar el historial:', error);
        }
    };

    const manejarFiltro = (valorBoton) => {
        const dias = Number(valorBoton);
        setRango(dias);
        cargarHistorial(dias);
    };

    useEffect(() => { cargarHistorial(rango); }, []);

    const obtenerLecturasFiltradas = () => {
        let resultado = lecturas.filter((lectura) => {
            const fechaLectura = new Date(lectura.created_at);
            if (fechaDesde && fechaLectura < new Date(fechaDesde)) return false;
            if (fechaHasta && fechaLectura > new Date(fechaHasta + 'T23:59:59')) return false;
            return true;
        });
        if (cantidadMaxima) resultado = resultado.slice(0, Number(cantidadMaxima));
        return resultado;
    };

    const rangos = [5, 7, 10, 15, 30];
    const lecturasFiltradas = obtenerLecturasFiltradas();

    return (
        <div className="panel">
            <h3 className="seccion-titulo">Historial de lecturas</h3>

            <div className="filtros">
                {rangos.map((r) => (<Boton key={r} valor={String(r)} darClick={manejarFiltro} />))}
            </div>
            <p>Mostrando los últimos {rango} días</p>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lecturas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="created_at" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperatura" stroke="#ef4444" />
                    <Line type="monotone" dataKey="humedad" stroke="#38bdf8" />
                    <Line type="monotone" dataKey="voltaje" stroke="#fbbf24" />
                    <Line type="monotone" dataKey="amperaje" stroke="#22c55e" />
                </LineChart>
            </ResponsiveContainer>

            <div className="panel-filtros">
                <h3>Filtros</h3>
                <div className="filtros-periodo">
                    <label><span>Desde</span><input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} /></label>
                    <label><span>Hasta</span><input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} /></label>
                    <label><span>Cantidad máxima</span><input type="number" min="1" value={cantidadMaxima} onChange={(e) => setCantidadMaxima(e.target.value)} placeholder="Todos" /></label>
                    <button type="button" className="btn-restablecer" onClick={() => { setFechaDesde(''); setFechaHasta(''); setCantidadMaxima(''); }}>Limpiar filtro</button>
                    <button type="button" className="btn-exportar" onClick={() => setModalExportar(true)}>
                        📤 Exportar
                    </button>
                </div>
                <p>Mostrando {lecturasFiltradas.length} de {lecturas.length} registros con estos filtros</p>
            </div>

            <div className="historial">
                {lecturasFiltradas.length === 0 ? (
                    <p className="historial-vacio">No hay lecturas en este periodo.</p>
                ) : (
                    <table className="historial-tabla">
                        <thead><tr><th>Fecha</th><th>Temperatura</th><th>Humedad</th><th>Voltaje</th><th>Amperaje</th></tr></thead>
                        <tbody>
                            {lecturasFiltradas.map((lectura) => (
                                <tr key={lectura.id}>
                                    <td>{new Date(lectura.created_at).toLocaleString()}</td>
                                    <td>{lectura.temperatura}</td>
                                    <td>{lectura.humedad}</td>
                                    <td>{lectura.voltaje}</td>
                                    <td>{lectura.amperaje}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ModalExportar
                abierto={modalExportar}
                onCerrar={() => setModalExportar(false)}
                filas={lecturas}
                filasFiltradas={lecturasFiltradas}
            />
        </div>
    );
}

export default Historial