import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: 'Seguridad a nivel de fila',
  title: 'Seguridad a nivel de fila (RLS): qué es, cómo funciona y cómo demostrar que se aplica',
  description:
    'La seguridad a nivel de fila limita qué filas de una tabla puede leer o escribir un usuario adjuntando un predicado a la propia tabla, de modo que el filtro se ejecuta dentro de la consulta y no en el código que la invoca.',
  definition:
    'La seguridad a nivel de fila (RLS) es un mecanismo de control de acceso que limita qué filas de una tabla puede leer o escribir un usuario concreto adjuntando un predicado a la propia tabla, de modo que la restricción se aplica dentro de la consulta y no en el código de aplicación que la emite.',
  explanation: [
    'La idea es más antigua que cualquier plataforma de IA y conviene enunciarla en su forma original. PostgreSQL la incluye desde la versión 9.5: CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) adjunta una condición a la tabla, y todo SELECT posterior —desde el ORM, desde una herramienta de informes, desde una sesión de psql que alguien abrió a las dos de la madrugada— la lleva consigo. Salesforce llega al mismo resultado mediante reglas de uso compartido y una jerarquía de propiedad. Lo que ambos compran es la propiedad que hace que la RLS merezca la pena: la restricción viaja con los datos, así que un endpoint nuevo, una nueva vía de exportación o un nuevo llamador la heredan sin que nadie tenga que acordarse de añadir una cláusula WHERE. El control de acceso que vive en el llamador es una convención; el que vive en la tabla es una frontera.',
    'ObjectStack expresa la misma construcción como metadatos que se pueden escribir. Un conjunto de permisos lleva un array rowLevelSecurity cuyas entradas nombran un objeto y una operación y después declaran un predicado: using para el lado de lectura (SELECT, UPDATE, DELETE) y check para el de escritura (INSERT, UPDATE), escrito como una expresión CEL restringida, por ejemplo owner_id == current_user.id o assigned_to_id in current_user.team_member_ids. El motor traduce cada predicado a un filtro de ObjectQL y lo empuja dentro de la consulta, de modo que las filas nunca llegan a la memoria del proceso; esto importa más de lo habitual cuando el siguiente salto es la ventana de contexto de un modelo de IA, porque una fila filtrada después de recuperarla ya se ha leído. Las políticas aplicables se combinan con OR, así que basta con que un usuario cumpla cualquiera de ellas para que se le permita el acceso; una política cuyo valor de contexto se resuelve como null o como un array vacío queda fuera en lugar de ampliar el acceso; y un predicado que el compilador no puede traducir no produce ningún filtro, momento en el que la ruta de lectura lo sustituye por un centinela de denegación y el objeto devuelve cero filas. El fallo siempre cierra, nunca abre.',
    'Ese último caso es el que debería apretar un revisor de seguridad, porque desde los metadatos es invisible: una regla que se lee como acceso acotado y se comporta como una negativa general, sin nada en el momento de escribirla que señale la línea responsable. La respuesta de ObjectStack es una compuerta de aplicabilidad en tiempo de compilación: validateRlsPredicateEnforceability recorre en el build cada using y cada check declarados y rechaza, como error, cualquier predicado que nunca llegaría a aplicarse. Lo que hace fiable a esa compuerta es que no modela el runtime ni intenta reconocerlo por patrones: invoca el propio procedimiento de decisión del runtime, isSupportedRlsExpression, sobre la misma entrada que consulta el compilador, así que «rechazado por el linter» y «descartado sin aplicarse» son el mismo booleano y no pueden desalinearse. Ese es el artefacto que hay que pedirle a cualquier plataforma. No «¿admite seguridad a nivel de fila?», porque todo el mundo dice que sí. Pregunta si el build puede rechazar una regla de seguridad que en silencio no haría nada.',
  ],
  alsoKnownAs: ['RLS', 'row-level security', 'seguridad a nivel de registro', 'control de acceso por fila'],
  relatedTerms: [
    'permission-model',
    'audit-trail',
    'governed-runtime',
    'declared-vs-enforced',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'objectos-automation-engine',
  ],
  pageSlugs: ['permissions', 'trust-center', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
