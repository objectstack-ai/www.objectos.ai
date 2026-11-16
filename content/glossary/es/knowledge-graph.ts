import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'knowledge-graph',
  term: 'Grafo de conocimiento',
  title: 'Grafo de conocimiento: qué es y en qué se diferencia de una ontología',
  description:
    'Un grafo de conocimiento representa la información de una organización como nodos y aristas tipadas, de modo que las preguntas sobre cómo se conectan las cosas se responden recorriendo relaciones en lugar de unir tablas.',
  definition:
    'Un grafo de conocimiento representa la información de una organización como nodos y aristas tipadas —las entidades que le importan y las relaciones etiquetadas entre ellas—, de modo que las preguntas sobre cómo se conectan las cosas pueden responderse recorriendo esas relaciones en lugar de haciendo joins entre tablas.',
  explanation: [
    'La forma más limpia de sostener la distinción que el sector no deja de difuminar: la ontología es el esquema y el grafo de conocimiento son los datos de instancia que se ajustan a él. Una ontología dice que una orden de trabajo se asocia a un dispositivo y que un dispositivo pertenece a un cliente; el grafo de conocimiento contiene los varios millones de órdenes de trabajo, dispositivos y clientes reales, y las aristas entre ellos. En la práctica, un grafo se almacena como tripletas RDF con una ontología OWL por encima o como un grafo de propiedades en un motor como Neo4j, y muchos grafos en producción funcionan con una ontología que nunca se llegó a escribir, que es justo como dos equipos acaban con definiciones incompatibles de «cliente» en el mismo grafo.',
    'En las preguntas con forma de conexión, un grafo de conocimiento es la herramienta adecuada y nada se le acerca. Las redes de fraude, las cadenas de titularidad real, las dependencias de la cadena de suministro, el análisis de impacto a lo largo de una red, la resolución de entidades entre una docena de sistemas de origen y cualquier pregunta del tipo «¿qué hay a cuatro saltos de aquí?» son nativas de un grafo y van de incómodas a imposibles con un join relacional. Si ese es el problema, la respuesta es una base de datos de grafos, y ninguna plataforma de aplicaciones la sustituye.',
    'El límite que comparte con la capa semántica es el mismo: un grafo de conocimiento es, en su inmensa mayoría, una estructura de lectura. Registra que estas cosas están conectadas; no declara quién puede cambiarlas, qué operaciones están permitidas ni qué registro de auditoría deja un cambio. ObjectStack aborda las conexiones desde el otro extremo: las relaciones se declaran como campos tipados de los objetos dentro de los propios metadatos de la aplicación, así que el grafo del negocio se desprende de la definición sobre la que ya se ejecuta la aplicación, en lugar de ser un segundo almacén que mantener sincronizado, y como esa definición es un archivo en tu repositorio, es una ontología de negocio abierta y no un grafo dentro de la plataforma de otro. Es una afirmación sobre propiedad y gobierno, no sobre analítica de grafos: ObjectStack no es una base de datos de grafos y no pretende ganar en recorridos profundos de múltiples saltos.',
  ],
  alsoKnownAs: ['knowledge graph', 'grafo de conocimiento empresarial', 'grafo semántico', 'grafo de entidades'],
  relatedTerms: [
    'ontology',
    'semantic-layer',
    'object-type-and-action-type',
    'application-metadata',
    'typed-metadata',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-race-open-vs-closed',
    'ai-ontology-open-protocol',
    'crm-ai-understands-customers',
  ],
  pageSlugs: ['data-modeling', 'analytics'],
} satisfies GlossaryTerm;

export default term;
