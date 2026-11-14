import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: 'Couche sémantique',
  title: 'Couche sémantique : définition, et quand elle suffit',
  description:
    'Une couche sémantique est un ensemble gouverné de définitions métier — métriques, dimensions, noms d’entités — entre le stockage brut et les outils, pour qu’un terme renvoie partout à un seul calcul convenu.',
  definition:
    'Une couche sémantique est un ensemble gouverné de définitions métier — métriques, dimensions et noms d’entités — placé entre le stockage brut des données et les outils qui les interrogent, de sorte que « client actif » ou « chiffre d’affaires net » renvoie à un seul calcul convenu, quels que soient la personne qui pose la question et l’outil depuis lequel elle la pose.',
  explanation: [
    'Le terme est né dans l’analytique. Le Semantic Layer de dbt, Cube, AtScale et LookML de Looker résolvent tous le même problème : chaque tableau de bord, chaque notebook et chaque tableur redérivait le « chiffre d’affaires » dans son propre SQL, et les chiffres avaient cessé de concorder. Définir la métrique une seule fois, au-dessus de l’entrepôt et en dessous des outils, fait de la définition l’artefact partagé, à la place de la requête. Depuis 2026, les deux mêmes mots servent aussi à désigner la couche de définitions métier sous l’IA agentique — le sens qu’emploient Fabric et Foundry —, ce qui explique que l’expression recouvre désormais deux périmètres différents selon qui parle, et qu’il vaille la peine de préciser lequel on vise.',
    'Pour une large catégorie de travaux, une couche sémantique est réellement l’outil juste et suffisant, et mieux vaut le dire franchement que de l’esquiver. Si le problème est que la finance et les ventes citent des chiffres d’affaires différents, que l’analytique en libre-service produit des tableaux de bord contradictoires, ou qu’un assistant d’IA doit répondre de façon cohérente à des questions portant sur un entrepôt, une couche de métriques au-dessus de cet entrepôt le résout — et ajouter une plateforme applicative en dessous reviendrait à répondre à une question que personne n’a posée. Une couche sémantique n’est pas une ontologie au rabais ; c’est un autre instrument, et sur les questions analytiques, c’est le meilleur.',
    'Ce qu’elle ne porte pas, c’est le côté écriture. Une couche sémantique est un contrat de lecture : elle établit ce que signifie un chiffre, pas qui peut modifier l’enregistrement sous-jacent, quelles opérations existent tout court, si une modification exige une approbation, ni quelle preuve subsiste ensuite. ObjectStack se tient de l’autre côté de cette ligne — les métadonnées applicatives typées qui définissent un objet déclarent aussi ses permissions, ses actions et ses étapes d’approbation, et le runtime les applique toutes à chaque appel, si bien que la définition gouverne les écritures au lieu de seulement décrire les lectures. ObjectStack ne remplace pas la couche sémantique d’un entrepôt, et une entreprise qui fait de la BI sérieuse en voudra toujours une.',
  ],
  alsoKnownAs: ['couche sémantique métier', 'couche de métriques', 'headless BI', 'semantic layer'],
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
