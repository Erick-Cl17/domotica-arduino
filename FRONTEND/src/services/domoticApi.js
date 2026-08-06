// Servicio centralizado para consumir la API 
// Agrupa en un solo lugar todas las llamadas fetch nuevas (foco, potencia, exportar a Excel) para no repetir la URL base ni el manejo de errores en cada componente. 
// No reemplaza los fetch que ya existen dentro de Panel.jsx / Historial.jsx, esos se dejan tal cual están.

const API_BASE = 'http://localhost:3000/api';

// Lecturas / potencia
export const obtenerPotenciaActual = async () => {
    const respuesta = await fetch(`${API_BASE}/lecturas/potencia/actual`);
    if (!respuesta.ok) throw new Error('No se pudo obtener la potencia actual');
    const cuerpo = await respuesta.json();
    return cuerpo.data;
};

// Dispositivo (foco)
export const obtenerEstadoFoco = async () => {
    const respuesta = await fetch(`${API_BASE}/dispositivos/foco`);
    if (!respuesta.ok) throw new Error('No se pudo obtener el estado del foco');
    const cuerpo = await respuesta.json();
    return cuerpo.data;
};

export const cambiarEstadoFoco = async (estado) => {
    const respuesta = await fetch(`${API_BASE}/dispositivos/foco`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
    });
    if (!respuesta.ok) throw new Error('No se pudo cambiar el estado del foco');
    const cuerpo = await respuesta.json();
    return cuerpo.data;
};

// Exportación a Excel (generada en el backend) 
export const urlExportarExcelBackend = () => `${API_BASE}/lecturas/export/excel`;

export const descargarExcelBackend = async () => {
    const respuesta = await fetch(urlExportarExcelBackend());
    if (!respuesta.ok) throw new Error('No se pudo generar el archivo Excel');

    const blob = await respuesta.blob();
    const url = window.URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    const fecha = new Date().toISOString().slice(0, 10);
    enlace.href = url;
    enlace.download = `reporte_domotico_${fecha}.xlsx`;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    window.URL.revokeObjectURL(url);
};

// Estado de conexión con el backend 
export const verificarConexionBackend = async () => {
    try {
        const respuesta = await fetch(`${API_BASE}/lecturas/ultima`);
        return respuesta.ok;
    } catch (error) {
        return false;
    }
};
