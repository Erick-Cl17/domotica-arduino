// Utilidades de clima, unidades y hora. No reutilizado.

export const UMBRALES_POR_DEFECTO = {
  tempNieve: 10,
  humLluvia: 75,
  tempSol: 27,
  tempSolNubes: 18,
  humNublado: 60,
};

export function clasificarClima(temperatura, humedad, u = UMBRALES_POR_DEFECTO) {
  const t = Number(temperatura);
  const h = Number(humedad);
  if (t <= u.tempNieve) return 'nieve';
  if (h >= u.humLluvia) return 'lluvia';
  if (h >= u.humNublado) return 'nublado';
  if (t >= u.tempSol) return 'sol';
  if (t >= u.tempSolNubes) return 'sol-nubes';
  return 'nublado';
}

export const ETIQUETAS_CLIMA = {
  sol: 'Soleado',
  'sol-nubes': 'Parcialmente nublado',
  nublado: 'Nublado',
  lluvia: 'Lluvioso',
  nieve: 'Frío intenso',
};

export function convertirTemp(valorCelsius, unidad) {
  const v = Number(valorCelsius);
  if (Number.isNaN(v)) return valorCelsius;
  return unidad === 'F' ? v * 9 / 5 + 32 : v;
}

export function formatearTemp(valorCelsius, unidad, decimales = 1) {
  const v = convertirTemp(valorCelsius, unidad);
  if (Number.isNaN(Number(v))) return '--';
  return Number(v).toFixed(decimales).replace(/\.0$/, '');
}

export const SIMBOLO_UNIDAD = { C: ' °C', F: ' °F' };

export const ZONAS_HORARIAS = [
  { id: 'America/Guayaquil', nombre: 'Guayaquil / Quito' },
  { id: 'America/Bogota', nombre: 'Bogotá' },
  { id: 'America/Lima', nombre: 'Lima' },
  { id: 'America/Mexico_City', nombre: 'Ciudad de México' },
  { id: 'America/New_York', nombre: 'Nueva York' },
  { id: 'Europe/Madrid', nombre: 'Madrid' },
  { id: 'UTC', nombre: 'UTC' },
];

export function horaEnZona(fecha, zona) {
  try {
    return new Intl.DateTimeFormat('es-EC', { timeZone: zona, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(fecha);
  } catch {
    return fecha.toLocaleTimeString('es-EC', { hour12: false });
  }
}

export function fechaEnZona(fecha, zona) {
  try {
    return new Intl.DateTimeFormat('es-EC', { timeZone: zona, weekday: 'short', day: '2-digit', month: 'short' }).format(fecha);
  } catch {
    return '';
  }
}

export function horaNumericaEnZona(fecha, zona) {
  try {
    const partes = new Intl.DateTimeFormat('en-GB', { timeZone: zona, hour: '2-digit', hour12: false }).formatToParts(fecha);
    const h = partes.find((p) => p.type === 'hour');
    return h ? Number(h.value) % 24 : fecha.getHours();
  } catch {
    return fecha.getHours();
  }
}

export function esDeNoche(fecha, zona) {
  const h = horaNumericaEnZona(fecha, zona);
  return h >= 19 || h < 6;
}
