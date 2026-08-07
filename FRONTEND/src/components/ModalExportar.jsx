import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { descargarExcelBackend } from '../services/domoticApi';

const FORMATOS = [
  { id: 'excel', nombre: 'Excel', ext: '.xlsx', icono: '🧮', color: '#22c55e' },
  { id: 'csv',   nombre: 'CSV',   ext: '.csv',  icono: '📑', color: '#38bdf8' },
  { id: 'json',  nombre: 'JSON',  ext: '.json', icono: '{ }', color: '#a28ef0' },
  { id: 'pdf',   nombre: 'PDF',   ext: '.pdf',  icono: '📓', color: '#f87171' },
];

const COLUMNAS = [
  { clave: 'fechaHora', titulo: 'Fecha y hora' },
  { clave: 'temperatura', titulo: 'Temperatura' },
  { clave: 'humedad', titulo: 'Humedad' },
  { clave: 'voltaje', titulo: 'Voltaje' },
  { clave: 'amperaje', titulo: 'Amperaje' },
];

function prepararFilas(lecturas) {
  return lecturas.map((l) => ({
    fechaHora: new Date(l.created_at).toLocaleString(),
    temperatura: l.temperatura,
    humedad: l.humedad,
    voltaje: l.voltaje,
    amperaje: l.amperaje,
  }));
}

function descargar(contenido, nombre, tipo) {
  const blob = new Blob([contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function ModalExportar({ abierto, onCerrar, filas, filasFiltradas }) {
  const [alcance, setAlcance] = useState('filtrados');
  const [estado, setEstado] = useState('inicio');
  const [formatoElegido, setFormatoElegido] = useState(null);

  useEffect(() => { if (abierto) { setEstado('inicio'); setFormatoElegido(null); } }, [abierto]);
  if (!abierto) return null;

  const lecturasBase = alcance === 'filtrados' ? filasFiltradas : filas;
  const datos = prepararFilas(lecturasBase);

  const exportar = async (formato) => {
    setFormatoElegido(formato);
    setEstado('generando');
    const sello = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    const base = `historial-${alcance}-${sello}`;

    try {
      if (formato.id === 'csv') {
        const csv = [COLUMNAS.map(c => c.titulo).join(','),
          ...datos.map(f => COLUMNAS.map(c => `"${f[c.clave] ?? ''}"`).join(','))].join('\n');
        descargar('\uFEFF' + csv, base + '.csv', 'text/csv;charset=utf-8;');
      } else if (formato.id === 'json') {
        descargar(JSON.stringify(datos, null, 2), base + '.json', 'application/json');
      } else if (formato.id === 'pdf') {
        const doc = new jsPDF();
        doc.text('Historial de Mediciones - Estación de Monitoreo', 14, 15);
        autoTable(doc, { head: [COLUMNAS.map(c => c.titulo)], body: datos.map(f => COLUMNAS.map(c => f[c.clave])), startY: 22 });
        doc.save(base + '.pdf');
      } else if (formato.id === 'excel') {
        // Se genera en el backend con el historial completo (punto 9 de la guía)
        await descargarExcelBackend();
      }
      setEstado('listo');
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('No se pudo generar el archivo. Revisa que el backend esté corriendo.');
      setEstado('inicio');
    }
  };

  return (
    <div className="exp-overlay" role="dialog" aria-modal="true" onClick={onCerrar}>
      <div className="exp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="exp-header">
          <span className="exp-header-icono">📤</span>
          <div>
            <h4>Exportar historial</h4>
            <p>Elige qué registros y en qué formato</p>
          </div>
          <button className="exp-cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        {estado !== 'listo' && (
          <>
            <div className="exp-seccion">
              <span className="exp-label">1 · ¿Qué quieres exportar?</span>
              <div className="exp-alcance">
                <button type="button" className={alcance === 'filtrados' ? 'activo' : ''}
                  onClick={() => setAlcance('filtrados')} disabled={estado === 'generando'}>
                  <strong>Solo filtrados</strong><span>{filasFiltradas.length} registros</span>
                </button>
                <button type="button" className={alcance === 'todos' ? 'activo' : ''}
                  onClick={() => setAlcance('todos')} disabled={estado === 'generando'}>
                  <strong>Todos</strong><span>{filas.length} registros</span>
                </button>
              </div>
            </div>

            <div className="exp-seccion">
              <span className="exp-label">2 · Formato del archivo</span>
              <div className="exp-formatos">
                {FORMATOS.map((f) => (
                  <button key={f.id} type="button"
                    className={`exp-formato ${formatoElegido?.id === f.id ? 'activo' : ''}`}
                    style={{ '--c': f.color }} onClick={() => exportar(f)}
                    disabled={estado === 'generando' || (f.id !== 'excel' && datos.length === 0)}>
                    <span className="exp-formato-icono">{f.icono}</span>
                    <strong>{f.nombre}</strong><small>{f.ext}</small>
                  </button>
                ))}
              </div>
              {datos.length === 0 && <p className="exp-aviso">No hay registros para exportar con esta selección (Excel siempre trae el historial completo del servidor, aunque diga 0 arriba).</p>}
            </div>
          </>
        )}

        {estado === 'generando' && (
          <div className="exp-estado exp-estado--cargando">
            <span className="exp-spinner" /> Generando archivo {formatoElegido?.nombre}…
          </div>
        )}

        {estado === 'listo' && (
          <div className="exp-estado exp-estado--listo">
            <span className="exp-check">✓</span>
            <strong>¡Exportado!</strong>
            <p>Archivo en formato {formatoElegido?.nombre} descargado correctamente.</p>
            <div className="exp-acciones">
              <button type="button" className="exp-btn-sec" onClick={() => setEstado('inicio')}>Exportar otro</button>
              <button type="button" className="exp-btn-pri" onClick={onCerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalExportar;