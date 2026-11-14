import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: 'Capa semántica',
  title: 'Capa semántica: qué es y cuándo es suficiente',
  description:
    'Una capa semántica es un conjunto gobernado de definiciones de negocio —métricas, dimensiones y nombres de entidades— entre el almacenamiento y las herramientas que lo consultan, para que cada término dé un solo cálculo acordado.',
  definition:
    'Una capa semántica es un conjunto gobernado de definiciones de negocio —métricas, dimensiones y nombres de entidades— situado entre el almacenamiento de datos en bruto y las herramientas que lo consultan, de modo que «cliente activo» o «ingresos netos» se resuelven en un único cálculo acordado sin importar quién pregunte ni desde qué herramienta.',
  explanation: [
    'El término nace en la analítica. La Semantic Layer de dbt, Cube, AtScale y LookML de Looker resuelven el mismo problema: cada dashboard, cada notebook y cada hoja de cálculo volvía a derivar los «ingresos» con su propio SQL, y las cifras dejaron de cuadrar. Definir la métrica una sola vez, por encima del data warehouse y por debajo de las herramientas, convierte la definición, y no la consulta, en el artefacto compartido. Desde 2026 las mismas dos palabras se usan también para la capa de definiciones de negocio que hay bajo la IA agéntica —el sentido que usan Fabric y Foundry—; de ahí que la expresión designe hoy dos alcances distintos según quién hable, y que convenga decir a cuál te refieres.',
    'Para una amplia clase de trabajo, una capa semántica es de verdad la herramienta correcta y suficiente, y vale la pena decirlo con claridad en lugar de esquivarlo. Si el problema es que finanzas y ventas citan cifras de ingresos distintas, que la analítica de autoservicio produce dashboards contradictorios o que un asistente de IA necesita responder de forma coherente a preguntas sobre un data warehouse, una capa de métricas sobre ese warehouse lo resuelve, y añadir una plataforma de aplicaciones por debajo sería responder a una pregunta que nadie ha hecho. Una capa semántica no es una ontología más débil; es un instrumento distinto, y en las preguntas analíticas es el mejor.',
    'Lo que no cubre es el lado de la escritura. Una capa semántica es un contrato de lectura: fija qué significa una cifra, no quién puede cambiar el registro subyacente, qué operaciones existen siquiera, si un cambio necesita aprobación ni qué evidencia queda después. ObjectStack está al otro lado de esa línea: los metadatos tipados de aplicación que definen un objeto declaran también sus permisos, sus acciones y sus pasos de aprobación, y el runtime los aplica todos en cada llamada, de modo que la definición gobierna las escrituras en lugar de limitarse a describir las lecturas. No sustituye a la capa semántica de un data warehouse, y una empresa que haga BI en serio seguirá queriendo una.',
  ],
  alsoKnownAs: ['capa semántica de negocio', 'capa de métricas', 'headless BI', 'semantic layer'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'governed-runtime',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'why-ai-agent-pilots-fail-four-layers',
    'enterprise-ontology-race-open-vs-closed',
    'context-bottleneck-read-half',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['analytics', 'data-modeling', 'platform'],
} satisfies GlossaryTerm;

export default term;
