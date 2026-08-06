// Botón para exportar a Excel usando el archivo generado en el backend
// El botón "Exportar a Excel" que ya existe en Historial.jsx genera el archivo del lado del cliente con la librería xlsx
// Este es un botón adicional, no un reemplazo.
import { useState } from 'react';
import { descargarExcelBackend } from '../services/domoticApi';

function ExportButtonBackend() {
    const [descargando, setDescargando] = useState(false);

    const manejarClick = async () => {
        setDescargando(true);
        try {
            await descargarExcelBackend();
        } catch (error) {
            console.error('Error al exportar el Excel del backend:', error);
            alert('No se pudo generar el archivo Excel desde el backend.');
        } finally {
            setDescargando(false);
        }
    };

    return (
        <button className="btn-exportar btn-exportar-backend" onClick={manejarClick} disabled={descargando}>
            {descargando ? 'Generando...' : 'Exportar a Excel (desde backend)'}
        </button>
    );
}

export default ExportButtonBackend;
