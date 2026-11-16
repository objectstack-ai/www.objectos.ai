import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: 'Ontología',
  title: 'Ontología en el software empresarial: la ontología de negocio ejecutable y quién es dueño de la tuya',
  description:
    'Una ontología de negocio ejecutable es la definición de un negocio que ejecuta un runtime —objetos y campos, relaciones, acciones, permisos, flujos y definiciones de agentes y herramientas—, validada, no razonada.',
  definition:
    'Una ontología, en el sentido en que la usa ObjectStack, es una ontología de negocio ejecutable: la definición de un negocio —sus objetos y campos, relaciones, acciones, permisos, flujos y definiciones de agentes y herramientas— escrita como metadatos tipados que un runtime valida y después ejecuta, de modo que el software y los agentes de IA operan el negocio a través de esa única definición y no a través de tablas en bruto.',
  explanation: [
    'La ontología es el software. En ObjectStack la ontología no es una capa dentro de una plataforma alojada: es la propia definición de la aplicación —objetos y campos, relaciones, acciones, permisos, flujos y definiciones de agentes y herramientas—, y el runtime la ejecuta, deriva de ella la base de datos, la API REST, las pantallas y las herramientas MCP, y aplica permisos y auditoría en cada llamada. La palabra trae consigo cuatro límites. Es ejecutable, no una ontología de representación del conocimiento: sin herencia, sin axiomas, sin razonador; la definición se valida y después se ejecuta. No es una capa semántica sobre tus sistemas existentes: es el sistema, y federar una fuente de datos externa es de solo lectura por defecto y está en una fase temprana. Las vistas, los dashboards, las apps y las traducciones son proyecciones de la ontología, no parte de ella. Y el código no desaparece: se traslada al runtime, en forma de hooks, cuerpos de acciones, CEL y JSX restringido.',
    'La palabra viene de la filosofía y llega al software empresarial a través de la ingeniería del conocimiento, donde designa un modelo formal de un dominio —sus clases, propiedades y relaciones— sobre el que el software puede razonar. Ese sentido práctico es estrecho y útil: una ontología nombra los tipos (cliente, orden de trabajo, dispositivo), las propiedades que lleva cada tipo y los vínculos entre ellos, una sola vez y para toda la organización, y eso es lo que la separa de un esquema de base de datos. Un esquema describe cómo una aplicación almacena sus filas; una ontología describe qué entiende el negocio por «cliente» de una forma que una docena de sistemas, una herramienta de informes y un modelo pueden resolver igual. Palantir Foundry es lo que la mayoría imagina en 2026, y la calidad de su modelado es realmente alta; Microsoft Fabric IQ y el grafo de conocimiento empresarial de Google se están moviendo hacia la misma capa.',
    'La mayor parte del trabajo de ontologías se queda a un paso de donde empieza el riesgo. Una ontología pensada para la recuperación es un modelo de lectura: hace que un agente hable con soltura del negocio y no dice nada sobre lo que ocurre cuando el agente tiene que cambiar algo. La capacidad que la completa es la operación de escritura declarada y sometida a comprobación de permisos —la acción—, junto con las reglas de permisos y auditoría adjuntas a la misma definición. Palantir merece reconocimiento por canalizar las escrituras a través de acciones gobernadas durante años; la cuestión abierta nunca fue si ese diseño es correcto.',
    'La cuestión abierta es quién tiene el archivo. En ObjectStack la definición es tu ontología de negocio: abierta, versionada y tuya, en tu propio repositorio; no código disperso por un framework ni un grafo guardado dentro del sistema de un proveedor. Una definición que puedes leer, comparar con un diff y llevar a otro host es un activo distinto de una definición igual de buena que vive dentro del motor de un proveedor y solo migra reconstruyéndola. Una ontología no hace que un agente de IA acierte: modelar bien un negocio sigue siendo un trabajo humano, lento y discutido, que ningún formato acorta. Lo que decide el formato es más acotado: si el resultado es lo bastante pequeño para que un agente lo abarque entero, lo bastante estricto para rechazar los errores del agente en el momento de escribirlo y lo bastante portable para sobrevivir a la plataforma en la que se escribió por primera vez.',
  ],
  alsoKnownAs: ['ontología de negocio ejecutable', 'ontología de negocio', 'ontología empresarial', 'ontología de dominio'],
  relatedTerms: [
    'ontology-projection',
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'what-does-the-ontology-is-the-software-mean',
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-platform-comparison',
    'objectos-action-tools',
  ],
  pageSlugs: ['ontology', 'compare', 'data-modeling', 'app-ui', 'permissions', 'mcp', 'agent-developer', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
