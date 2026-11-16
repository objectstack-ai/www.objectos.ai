import type { AuthoredClusterCopy } from '../../../src/lib/cluster-i18n';

// Authored French copy of the English cluster in src/lib/clusters.ts (#427).
// The title front-loads the query French readers search for.
const page: AuthoredClusterCopy = {
  slug: 'legacy-system-modernization',
  title: 'Modernisation de systèmes hérités avec l’IA',
  shortTitle: 'Modernisation legacy',
  description:
    'Modernisation de systèmes hérités avec l’IA, pas à pas : connecter les bases de données existantes, modéliser les objets métier et éviter les migrations risquées.',
  eyebrow: 'Guide de modernisation',
  lead:
    'Moderniser un système hérité ne commence pas toujours par une refonte. Pour beaucoup d’équipes, la voie la moins risquée consiste à connecter d’abord les systèmes existants en lecture seule, à modéliser les enregistrements qui comptent, puis à ajouter par-dessus des workflows natifs pour l’IA.',
  definition:
    'La modernisation assistée par l’IA laisse le système de référence en place et crée une couche d’objets gouvernée pour l’IA, les APIs, les workflows, les tableaux de bord et les nouvelles applications. L’ancien système reste en service et continue d’écrire ses lignes ; la nouvelle couche les fédère — en lecture seule par défaut, et encore récente — et rend ses données et ses processus intelligibles.',
  whyNow: [
    'Beaucoup de systèmes centraux font encore tourner l’entreprise, mais sont trop fragiles pour évoluer souvent.',
    'L’IA pousse à exposer les anciennes données en sécurité, sans ouvrir un accès direct à la base.',
    'Un budget de modernisation porte mieux ses fruits quand l’équipe peut prouver la valeur avant de décider d’une migration.',
  ],
  capabilities: [
    'Connecter d’abord une base existante comme datasource en lecture seule — la fédération est en lecture seule par défaut, et encore récente — et modéliser comme objets les tables qui comptent, sans déplacer un seul enregistrement.',
    'Décrire les tables héritées comme des objets métier que les agents, les workflows et les utilisateurs comprennent.',
    'Ajouter de nouveaux écrans, rapports et automatisations autour de l’ancien système, qui reste la source de vérité.',
    'Faire passer les actions de l’IA par les permissions, les approbations et les journaux d’audit plutôt que par des scripts ad hoc.',
  ],
  useCases: [
    'Ajouter recherche et analyse par l’IA sur des données de CRM, d’ERP, de tickets ou de commandes.',
    'Construire un workflow moderne autour d’un système hérité sans réécrire toute l’application.',
    'Tracer une trajectoire de remplacement progressive en modélisant un domaine à la fois.',
  ],
  faq: [
    {
      question: 'La modernisation par l’IA peut-elle éviter une migration complète ?',
      answer:
        'Souvent, oui. Une couche d’objets gouvernée peut se connecter au système de référence existant — en lecture seule par défaut, l’écriture s’activant délibérément objet par objet —, exposer les concepts métier et permettre à l’équipe d’ajouter des workflows d’IA sans basculer immédiatement chaque processus vers une nouvelle plateforme. La fédération est récente : attendez-vous à ce que le chemin de lecture soit le plus mûr.',
    },
    {
      question: 'Que moderniser en premier ?',
      answer:
        'Commencez par des enregistrements à forte valeur et bien compris : clients, dossiers, ordres de travail, commandes ou rapports. Le meilleur premier pas est souvent un workflow dont les utilisateurs connaissent déjà le problème et dont les données existent déjà.',
    },
    {
      question: 'Quel est le risque de connecter l’IA à des systèmes hérités ?',
      answer:
        'Le risque, c’est de laisser l’IA contourner l’identité, les permissions et l’audit. La conception la plus sûre fait passer l’IA par un runtime qui respecte le périmètre de chaque utilisateur, les approbations et les frontières du système.',
    },
  ],
};

export default page;
