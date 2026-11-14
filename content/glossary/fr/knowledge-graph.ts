import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'knowledge-graph',
  term: 'Graphe de connaissances',
  title: 'Graphe de connaissances : définition, et en quoi il diffère d’une ontologie',
  description:
    'Un graphe de connaissances représente l’information d’une organisation sous forme de nœuds et d’arêtes typées, pour répondre aux questions de connexion en parcourant des relations plutôt qu’en joignant des tables.',
  definition:
    'Un graphe de connaissances représente l’information d’une organisation sous forme de nœuds et d’arêtes typées — les entités qui comptent pour elle et les relations étiquetées qui les relient —, de sorte que les questions sur la manière dont les choses sont connectées trouvent leur réponse en parcourant ces relations plutôt qu’en joignant des tables.',
  explanation: [
    'La façon la plus nette de tenir la distinction que la catégorie ne cesse de brouiller : l’ontologie est le schéma, le graphe de connaissances est l’ensemble des données d’instance qui le peuplent en s’y conformant. Une ontologie dit qu’un ordre de travail se rattache à un équipement et qu’un équipement appartient à un client ; le graphe de connaissances contient les plusieurs millions d’ordres de travail, d’équipements et de clients réels, ainsi que les arêtes qui les relient. En pratique, un graphe est stocké soit sous forme de triplets RDF surmontés d’une ontologie OWL, soit sous forme de graphe de propriétés dans un moteur comme Neo4j, et nombre de graphes en production tournent avec une ontologie qui n’a jamais été écrite — c’est exactement ainsi que deux équipes se retrouvent avec des définitions incompatibles de « client » dans le même graphe.',
    'Sur les questions qui portent sur des connexions, un graphe de connaissances est le bon outil, et rien d’autre n’en approche. Réseaux de fraude, chaînes de bénéficiaires effectifs, dépendances de la chaîne d’approvisionnement, analyse d’impact à travers un réseau, résolution d’entités entre une douzaine de systèmes sources, et toute question du type « qu’y a-t-il à quatre sauts d’ici » sont natives dans un graphe, et malcommodes, voire impossibles, avec une jointure relationnelle. Si c’est là votre problème, la réponse est une base de données orientée graphe, et aucune plateforme applicative ne la remplace.',
    'Sa limite est la même que celle de la couche sémantique : un graphe de connaissances est très majoritairement une structure de lecture. Il enregistre que ces choses sont connectées ; il ne déclare pas qui peut les modifier, quelles opérations sont permises, ni quelle trace d’audit laisse une modification. ObjectStack aborde les connexions par l’autre bout — les relations sont déclarées comme des champs typés sur les objets, dans les métadonnées propres de l’application, si bien que le graphe de l’entreprise découle de la définition sur laquelle l’application tourne déjà, au lieu d’être un second stockage à garder synchronisé ; et parce que cette définition est un fichier dans votre dépôt, c’est une ontologie métier ouverte plutôt qu’un graphe à l’intérieur de la plateforme de quelqu’un d’autre. C’est une affirmation sur la propriété et la gouvernance, pas sur l’analytique de graphes : ObjectStack n’est pas une base de données orientée graphe et ne cherche pas à l’emporter sur les parcours profonds à sauts multiples.',
  ],
  alsoKnownAs: ['knowledge graph', 'graphe de connaissances d’entreprise', 'graphe sémantique', 'graphe d’entités'],
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
