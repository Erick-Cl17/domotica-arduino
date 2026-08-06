// Adaptado de: App.jsx (proyecto Calculadora) + Boton.jsx reutilizado para los botones de filtro (mismo patrón valor/darClick).
// La tabla y gráfico son nuevos, requeridos por el proyecto de Estación de Monitoreo (no existían en los proyectos originales).
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import Boton from '../components/Boton';

const API_URL = 'http://localhost:3000/api/lecturas';

function Historial() {
    const [lecturas, setLecturas] = useState([]);
    const [rango, setRango] = useState(7);

    const cargarHistorial = async (dias) => {
        try {
            const respuesta = await fetch(`${API_URL}?dias=${dias}`);
            const datos = await respuesta.json();
            setLecturas(datos);
        } catch (error) {
            console.error('Error al cargar el historial:', error);
        }
    };

    // reutiliza el mismo patrón de manejador "recibe valor del Boton" de
    // la Calculadora, aquí para seleccionar el rango de días
    const manejarFiltro = (valorBoton) => {
        const dias = Number(valorBoton);
        setRango(dias);
        cargarHistorial(dias);
    };

    useEffect(() => {
        cargarHistorial(rango);
    }, []);

    const exportarExcel = () => {
        const hoja = XLSX.utils.json_to_sheet(lecturas);
        const libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, "Historial");
        XLSX.writeFile(libro, `historial_${rango}dias.xlsx`);
    };

    const rangos = [5, 7, 10, 15, 30];

    return (
        <div className="panel">
            <h2>Historial de lecturas</h2>

            <div className="filtros">
                {rangos.map((r) => (
                    <Boton key={r} valor={String(r)} darClick={manejarFiltro} />
                ))}
            </div>
            <p>Mostrando los últimos {rango} días</p>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lecturas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="created_at" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperatura" stroke="#00d5ff" />
                    <Line type="monotone" dataKey="humedad" stroke="#22c55e" />
                    <Line type="monotone" dataKey="voltaje" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="amperaje" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>

            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Temperatura</th>
                        <th>Humedad</th>
                        <th>Voltaje</th>
                        <th>Amperaje</th>
                    </tr>
                </thead>
                <tbody>
                    {lecturas.map((lectura) => (
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

            <button className="btn-exportar" onClick={exportarExcel}>Exportar a Excel</button>
        </div>
    );
}

export default Historial
