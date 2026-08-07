// Base de preguntas frecuentes del chatbot.
// Cada pregunta tiene "palabras" (las palabras clave que el bot busca en lo que
// escribe el usuario) y "respuesta" (lo que contesta si encuentra coincidencia).
// Para agregar una pregunta nueva, solo copia un bloque y cambia el contenido.

const preguntasFrecuentes = [
    {
        palabras: ['proyecto', 'trata', 'que es esto', 'para que sirve', 'estacion'],
        respuesta: 'Este proyecto es una Estación de Monitoreo domótica: mide temperatura, humedad, voltaje y amperaje con Arduino, guarda los datos en una base de datos con Node.js, y los muestra en este dashboard hecho en React. También puedes encender y apagar un foco desde aquí, y exportar el historial de datos.'
    },
    {
        palabras: ['voltaje', 'volt', 'volts', 'voltios'],
        respuesta: 'El voltaje es la "fuerza" que empuja la corriente eléctrica por un cable, se mide en voltios (V). En este proyecto medimos el voltaje del foco con un divisor de voltaje conectado a Arduino.'
    },
    {
        palabras: ['amperaje', 'corriente', 'amperios', 'amp'],
        respuesta: 'El amperaje (o corriente) es la cantidad de electricidad que realmente está fluyendo por el circuito en un momento dado, se mide en amperios (A). Lo medimos con un sensor ACS712 conectado al circuito del foco.'
    },
    {
        palabras: ['potencia', 'watt', 'vatios'],
        respuesta: 'La potencia eléctrica es cuánta energía consume un dispositivo por segundo, se mide en vatios (W). Se calcula multiplicando Potencia = Voltaje x Amperaje. El backend la calcula automáticamente con esos dos datos.'
    },
    {
        palabras: ['temperatura', 'grados', 'calor', 'frio'],
        respuesta: 'La temperatura ambiental se mide en grados Celsius (°C) con un sensor DHT11 conectado al Arduino. En el panel puedes cambiar entre °C y °F con el selector de unidades.'
    },
    {
        palabras: ['humedad', 'humedo', 'seco'],
        respuesta: 'La humedad es la cantidad de vapor de agua en el aire, se mide en porcentaje (%). También tenemos un sensor aparte que mide la humedad de la tierra, para saber si una planta necesita agua.'
    },
    {
        palabras: ['foco', 'luz', 'encender', 'apagar', 'prender'],
        respuesta: 'El foco se controla con el botón del foquito del dashboard. Cuando lo enciendes, React le avisa al backend, el backend le manda la orden al Arduino, y el Arduino activa un relé que deja pasar la corriente al foco real.'
    },
    {
        palabras: ['dht11', 'dht', 'sensor de temperatura'],
        respuesta: 'El DHT11 es el sensor que mide temperatura y humedad ambiental al mismo tiempo. Es económico y muy usado en proyectos con Arduino.'
    },
    {
        palabras: ['acs712', 'sensor de corriente'],
        respuesta: 'El ACS712 es un sensor que mide la corriente eléctrica (amperaje) que pasa por un cable, sin necesidad de cortar el circuito. Se coloca en serie con el foco.'
    },
    {
        palabras: ['rele', 'relay'],
        respuesta: 'El relé es como un interruptor controlado eléctricamente por el Arduino. El Arduino solo entrega 5V y poca corriente, así que no puede prender un foco real directamente; el relé sí puede, usando una fuente externa.'
    },
    {
        palabras: ['exportar', 'excel', 'csv', 'pdf', 'descargar'],
        respuesta: 'En la sección Historial puedes filtrar por fecha, tipo de medida y cantidad, y luego exportar los datos en Excel, CSV, JSON o PDF.'
    },
    {
        palabras: ['node', 'nodejs', 'backend'],
        respuesta: 'Node.js es la tecnología que usamos para el backend: recibe los datos del Arduino, los valida, los guarda en la base de datos y expone una API para que React los consuma.'
    },
    {
        palabras: ['react', 'frontend', 'dashboard'],
        respuesta: 'React es la tecnología del frontend: es lo que construye este dashboard que estás viendo, con los indicadores, gráficos y botones.'
    },
    {
        palabras: ['base de datos', 'mysql', 'knex', 'objection'],
        respuesta: 'Usamos MySQL como base de datos, y las librerías Knex.js y Objection.js en el backend para manejar las tablas y las consultas sin escribir SQL directo en los controladores.'
    },
    {
        palabras: ['como funciona', 'como se usa', 'como manejo', 'como uso', 'manual', 'ayuda', 'instrucciones'],
        respuesta: 'Así se usa: en el Panel ves las lecturas actuales (temperatura, humedad, voltaje, amperaje, potencia). Con el botón grande enciendes/apagas el sensor local, y con el botón del foco lo prendes/apagas de verdad (se guarda en la base de datos). En el menú de arriba entras a "Historial" para ver el registro completo, filtrarlo y exportarlo.'
    },
    {
        palabras: ['navegar', 'menu', 'paginas', 'ir a', 'donde esta'],
        respuesta: 'Arriba, en el encabezado, tienes dos enlaces: "Panel" (la pantalla principal con las lecturas en tiempo real) e "Historial" (la tabla y el gráfico con todas las mediciones guardadas).'
    },
    {
        palabras: ['filtrar', 'filtro', 'buscar por fecha'],
        respuesta: 'En Historial puedes filtrar por rango de días (botones 5/7/10/15/30), por fecha exacta (Desde/Hasta), por cantidad máxima de registros, y elegir qué variables mostrar (temperatura, humedad, voltaje, amperaje) antes de exportar.'
    },
    {
        palabras: ['unidad', 'celsius', 'fahrenheit', 'grados f'],
        respuesta: 'Puedes cambiar entre Celsius y Fahrenheit con el switch °C/°F que está en el encabezado, junto al reloj.'
    },
    {
        palabras: ['reloj', 'hora', 'zona horaria'],
        respuesta: 'El reloj del encabezado muestra la hora actual, y puedes cambiar la zona horaria con el selector que está justo debajo de la hora.'
    },
];

export default preguntasFrecuentes;
