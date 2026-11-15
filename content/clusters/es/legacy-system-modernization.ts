import type { AuthoredClusterCopy } from '../../../src/lib/cluster-i18n';

// Authored Spanish copy of the English cluster in src/lib/clusters.ts (#427).
// The title front-loads the query Spanish readers search for.
const page: AuthoredClusterCopy = {
  slug: 'legacy-system-modernization',
  title: 'Modernización de sistemas heredados con IA',
  shortTitle: 'Modernización legacy',
  description:
    'Modernización de sistemas heredados con IA, paso a paso: conecta las bases de datos que ya usas, modela los objetos de negocio y evita migraciones arriesgadas.',
  eyebrow: 'Guía de modernización',
  lead:
    'Modernizar un sistema legacy no siempre empieza por reescribirlo. Para muchos equipos, el camino de menor riesgo es conectar primero los sistemas existentes en solo lectura, modelar los registros que importan y añadir encima workflows nativos de IA.',
  definition:
    'La modernización asistida por IA deja el sistema de registro donde está y crea una capa de objetos gobernada para la IA, las APIs, los workflows, los dashboards y las nuevas aplicaciones. El sistema antiguo sigue operando y escribiendo sus filas; la nueva capa las federa — en solo lectura por defecto, y aún en fase temprana — y hace comprensibles sus datos y sus procesos.',
  whyNow: [
    'Muchos sistemas centrales siguen sosteniendo el negocio, pero son demasiado frágiles para cambiar con frecuencia.',
    'La IA presiona para exponer datos antiguos de forma segura, sin abrir acceso directo a la base de datos.',
    'Un presupuesto de modernización rinde más cuando el equipo puede demostrar valor antes de decidir una migración.',
  ],
  capabilities: [
    'Conectar primero una base de datos existente como datasource de solo lectura — la federación es de solo lectura por defecto, y aún temprana — y modelar como objetos las tablas que importan sin mover un solo registro.',
    'Describir las tablas heredadas como objetos de negocio que agentes, workflows y usuarios puedan entender.',
    'Añadir pantallas, informes y automatizaciones nuevas alrededor del sistema antiguo, que sigue siendo la fuente de verdad.',
    'Hacer pasar las acciones de la IA por permisos, aprobaciones y registros de auditoría, en lugar de scripts improvisados.',
  ],
  useCases: [
    'Añadir búsqueda y análisis con IA sobre datos de CRM, ERP, tickets o pedidos.',
    'Construir un workflow moderno alrededor de un sistema legacy sin reescribir toda la aplicación.',
    'Trazar una ruta de sustitución gradual, modelando un dominio cada vez.',
  ],
  faq: [
    {
      question: '¿Puede la modernización con IA evitar una migración completa?',
      answer:
        'A menudo, sí. Una capa de objetos gobernada puede conectarse al sistema de registro existente — en solo lectura por defecto, con la escritura habilitada deliberadamente objeto por objeto —, exponer los conceptos de negocio y permitir que el equipo añada workflows de IA sin trasladar de inmediato cada proceso a una plataforma nueva. La federación está en fase temprana: cuenta con que la ruta de lectura sea la madura.',
    },
    {
      question: '¿Qué conviene modernizar primero?',
      answer:
        'Empieza por registros de alto valor y bien comprendidos: clientes, casos, órdenes de trabajo, pedidos o informes. El mejor primer paso suele ser un workflow cuyo problema los usuarios ya conocen y cuyos datos ya existen.',
    },
    {
      question: '¿Qué riesgo tiene conectar la IA a sistemas heredados?',
      answer:
        'El riesgo es que la IA se salte la identidad, los permisos y la auditoría. El diseño más seguro es que la IA opere a través de un runtime que respete el alcance de cada usuario, las aprobaciones y los límites del sistema.',
    },
  ],
};

export default page;
