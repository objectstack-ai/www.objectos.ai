import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: 'Ontologie',
  title: 'Ontologie en logiciel d’entreprise : l’ontologie métier exécutable, et à qui appartient la vôtre',
  description:
    'Une ontologie métier exécutable est la définition d’une entreprise qu’un runtime exécute — objets et champs, relations, actions, permissions, flows, agents et outils — validée, et non soumise à un raisonneur.',
  definition:
    'Une ontologie, au sens où ObjectStack emploie le mot, est une ontologie métier exécutable : la définition d’une entreprise — ses objets et leurs champs, ses relations, ses actions, ses permissions, ses flows, ses définitions d’agents et d’outils — écrite en métadonnées typées qu’un runtime valide puis exécute, de sorte que le logiciel et les agents d’IA opèrent l’entreprise à travers cette définition unique plutôt qu’à travers des tables brutes.',
  explanation: [
    'L’ontologie est le logiciel. Dans ObjectStack, l’ontologie n’est pas une couche à l’intérieur d’une plateforme hébergée : c’est la définition propre de l’application — objets et champs, relations, actions, permissions, flows, définitions d’agents et d’outils — et le runtime l’exécute, en dérive la base de données, l’API REST, les écrans et les outils MCP, et applique permissions et audit à chaque appel. Le mot s’accompagne de quatre limites. Elle est exécutable, et non une ontologie de représentation des connaissances : pas d’héritage, pas d’axiomes, pas de raisonneur — la définition est validée, puis exécutée. Ce n’est pas une couche sémantique posée sur vos systèmes existants : c’est le système lui-même, et la fédération d’une source de données externe est en lecture seule par défaut, et encore à un stade précoce. Les vues, tableaux de bord, applications et traductions sont des projections de l’ontologie, pas des parties de celle-ci. Et le code ne disparaît pas : il se déplace dans le runtime, sous forme de hooks, de corps d’actions, de CEL et de JSX contraint.',
    'Le mot vient de la philosophie et arrive dans le logiciel d’entreprise par l’ingénierie des connaissances, où il désigne un modèle formel d’un domaine — ses classes, ses propriétés et ses relations — sur lequel un logiciel peut raisonner. Ce sens pratique est étroit et utile : une ontologie nomme les types (client, ordre de travail, équipement), les propriétés que porte chaque type et les liens entre eux, une seule fois, pour toute l’organisation, et c’est ce qui la distingue d’un schéma de base de données. Un schéma décrit comment une application stocke ses lignes ; une ontologie décrit ce que l’entreprise entend par « client », d’une manière qu’une douzaine de systèmes, un outil de reporting et un modèle peuvent tous résoudre de la même façon. Palantir Foundry est ce que la plupart des gens imaginent en 2026, et la qualité de sa modélisation est réellement élevée ; Microsoft Fabric IQ et le graphe de connaissances d’entreprise de Google investissent la même couche.',
    'La plupart des travaux d’ontologie s’arrêtent une étape avant l’endroit où le risque commence. Une ontologie conçue pour la recherche d’information est un modèle de lecture : elle rend un agent éloquent sur l’entreprise et ne dit rien de ce qui se passe quand l’agent doit modifier quelque chose. La capacité qui la complète est l’opération d’écriture déclarée et soumise au contrôle des permissions — l’action —, accompagnée des règles de permission et d’audit attachées à la même définition. Palantir mérite d’être salué pour avoir fait passer les écritures par des actions gouvernées depuis des années ; la question ouverte n’a jamais été de savoir si cette conception est la bonne.',
    'La question ouverte, c’est de savoir qui détient le fichier. Dans ObjectStack, la définition est votre ontologie métier : ouverte, versionnée et à vous, dans votre propre dépôt — ni du code éparpillé dans un framework, ni un graphe détenu dans le système d’un éditeur. Une définition que vous pouvez lire, comparer en diff et déplacer vers un autre hébergeur est un actif différent d’une définition tout aussi bonne qui vit dans le moteur d’un éditeur et ne migre qu’en étant reconstruite. Une ontologie ne rend pas un agent d’IA correct : bien modéliser une entreprise reste un travail humain lent et disputé, qu’aucun format ne raccourcit. Ce que le format décide est plus étroit — si le résultat est assez petit pour qu’un agent le tienne en entier, assez strict pour rejeter les erreurs de l’agent au moment de l’écriture, et assez portable pour survivre à la plateforme sur laquelle il a d’abord été écrit.',
  ],
  alsoKnownAs: ['ontologie métier exécutable', 'ontologie métier', 'ontologie d’entreprise', 'ontologie de domaine'],
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
