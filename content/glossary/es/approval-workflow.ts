import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'approval-workflow',
  term: 'Flujo de aprobación',
  title: 'Flujo de aprobación: qué es, cómo se enruta y dónde vive realmente el plazo',
  description:
    'Un flujo de aprobación retiene un cambio propuesto en estado pendiente hasta que una persona responsable registra una decisión explícita, enrutado por rol y no por nombre y con la decisión anotada antes de que el cambio siga.',
  definition:
    'Un flujo de aprobación es un proceso de negocio en el que un cambio propuesto queda retenido en estado pendiente hasta que una persona con autoridad para decidir registra una aprobación o un rechazo explícitos, de modo que el cambio solo surte efecto después de que alguien responsable lo haya firmado.',
  explanation: [
    'Los flujos de aprobación son muy anteriores al software de workflow: las solicitudes de compra, los comités de control de cambios, los comités de crédito y la autorización de ensayos clínicos codifican el mismo patrón. Tres propiedades separan uno real de una notificación que solo lo parece. El cambio tiene que quedar bloqueado de verdad mientras la solicitud está pendiente, y no seguir adelante mientras un correo espera sin leer. La decisión tiene que poder atribuirse a una persona que tenía la autoridad en el momento de decidir, no a un buzón compartido. Y el enrutamiento tiene que resolverse contra la organización y no contra nombres, porque una cadena atada a personas concretas es una cadena que se rompe en silencio en la siguiente reorganización y se redirige a alguien que ya se fue. Un proceso que no cumple ninguna de las tres es una notificación con retraso.',
    'En ObjectStack una aprobación no es un sistema aparte, sino un nodo duradero dentro de un flujo: la ejecución llega al nodo de aprobación, abre una solicitud, se suspende y se reanuda por su arista de salida approve o reject en cuanto se registra una decisión. Los aprobadores se declaran como un usuario, un rol, un equipo o la jerarquía de responsables del solicitante, y se resuelven contra la identidad en vivo en el momento de la solicitud: un puesto se expande a quien lo ocupe en ese momento. Cada paso fija su propio comportamiento, así que un nodo puede ser «gana la primera respuesta» y el siguiente «unanimidad»; lockRecord mantiene quieto el registro para que nadie edite por delante del revisor; maxRevisions acota el bucle de devolución para que una solicitud no orbite para siempre en «por favor, revisa»; y onEmptyApprovers decide qué ocurre cuando la lista de aprobadores no se resuelve en nadie, y por defecto recurre al rescate de un administrador en lugar de dejar pasar el registro en silencio. La decisión se escribe en el libro de auditoría antes de que la ejecución avance, así que no existe ningún camino que deje atrás una aprobación sin una decisión registrada. Lo que lleva un nodo de aprobación es una decisión de negocio, como un descuento, un reembolso o una compra. Los cambios que una IA hace en la propia app llegan a una persona por otro camino: en ObjectStack de código abierto, el cambio de un agente de programación son metadatos en un diff de git que alguien revisa, y en ObjectOS Cloud un cambio de AI Builder en una app en producción que ya contiene registros se guarda como borrador para que una persona lo publique; eso es lo que convierte el software escrito por un agente en algo que una persona puede firmar en lugar de descubrir a posteriori.',
    'La pregunta que merece la pena hacerle a cualquier motor de aprobaciones es dónde vive su plazo, y aquí la respuesta honesta es acotada. Un nodo wait de un flujo no tiene ningún timeout: dos claves llegaron a afirmar lo contrario, y ambas se retiraron en lugar de quedarse como una promesa que el runtime no cumple. La escalada solo existe en el nodo de aprobación, como un SLA por nodo y no como un servicio global de temporizadores. Si se fija timeoutHours, un barrido encuentra las solicitudes que siguen pendientes pasadas esas horas desde su creación y escala cada una como máximo una sola vez, ejecutando la acción configurada —notify, reassign, auto_approve o auto_reject—, con escalateTo apuntando a un usuario o a un puesto que se expande a quienes lo ocupan en ese momento, y la fila de auditoría de la escalada se escribe primero para que un barrido que se cae o se repite no pueda dispararse dos veces. La consecuencia de diseño merece decirse sin rodeos: si un paso tiene que tener un límite de tiempo, modélalo como una aprobación con SLA o gobierna el plazo desde fuera del flujo. Un wait a secas esperará con paciencia, correctamente y para siempre.',
  ],
  alsoKnownAs: [
    'flujo de trabajo de aprobación',
    'circuito de aprobación',
    'proceso de aprobación',
    'cadena de aprobación',
    'aprobación multinivel',
  ],
  relatedTerms: [
    'audit-trail',
    'permission-model',
    'governed-runtime',
    'reviewable-diff',
    'declared-vs-enforced',
  ],
  articleSlugs: [
    'automation-pause-resume-approvals',
    'objectos-automation-engine',
    'ai-wrote-your-app-dare-to-merge',
  ],
  pageSlugs: ['approvals', 'automation', 'permissions'],
} satisfies GlossaryTerm;

export default term;
