import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: 'Sécurité au niveau des lignes',
  title: 'Sécurité au niveau des lignes (RLS) : définition, fonctionnement et comment prouver qu’elle s’applique',
  description:
    'La sécurité au niveau des lignes limite les lignes qu’un utilisateur peut lire ou écrire en attachant un prédicat à la table elle-même : le filtre s’exécute dans la requête, pas dans le code qui l’appelle.',
  definition:
    'La sécurité au niveau des lignes (RLS, row-level security) est un mécanisme de contrôle d’accès qui restreint les lignes d’une table qu’un utilisateur donné peut lire ou écrire en attachant un prédicat à la table elle-même, de sorte que la restriction s’applique à l’intérieur de la requête plutôt que dans le code applicatif qui l’émet.',
  explanation: [
    'L’idée est plus ancienne que n’importe quelle plateforme d’IA, et elle mérite d’être énoncée sous sa forme d’origine. PostgreSQL la propose depuis la version 9.5 : CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) attache une condition à la table, et chaque SELECT qui suit — depuis l’ORM, depuis un outil de reporting, depuis une session psql ouverte par quelqu’un à 2 heures du matin — la porte avec lui. Salesforce obtient le même résultat avec des règles de partage et une hiérarchie de propriété. Ce que l’un et l’autre achètent, c’est la propriété qui justifie la peine que demande la RLS : la restriction voyage avec les données, si bien qu’un nouvel endpoint, un nouveau chemin d’export ou un nouvel appelant en hérite sans que personne n’ait à se souvenir d’ajouter une clause WHERE. Un contrôle d’accès logé dans l’appelant est une convention ; un contrôle d’accès logé dans la table est une frontière.',
    'ObjectStack exprime la même construction sous forme de métadonnées que l’on peut écrire. Un jeu de permissions porte un tableau rowLevelSecurity dont chaque entrée nomme un objet et une opération, puis déclare un prédicat : using pour le côté lecture (SELECT, UPDATE, DELETE), check pour le côté écriture (INSERT, UPDATE), rédigé comme une expression CEL contrainte telle que owner_id == current_user.id ou assigned_to_id in current_user.team_member_ids. Le moteur abaisse chaque prédicat en filtre ObjectQL et le pousse dans la requête, si bien que les lignes n’entrent jamais dans la mémoire du processus — ce qui compte plus que d’habitude quand l’étape suivante est la fenêtre de contexte d’un modèle d’IA, car une ligne filtrée après sa récupération a déjà été lue. Les politiques applicables se combinent par OU, si bien qu’un utilisateur qui remplit les conditions de l’une quelconque d’entre elles est autorisé ; une politique dont la valeur de contexte se résout en null ou en tableau vide se retire au lieu d’élargir l’accès ; et un prédicat que le compilateur ne sait pas abaisser ne produit aucun filtre, auquel cas le chemin de lecture lui substitue une sentinelle de refus et l’objet renvoie zéro ligne. En cas d’échec, l’accès se ferme ; il ne s’ouvre jamais.',
    'C’est ce dernier cas qu’un relecteur sécurité doit creuser, parce qu’il est invisible depuis les métadonnées : une règle qui se lit comme un accès limité à un périmètre et se comporte comme un refus général, sans que rien, au moment de l’écriture, ne désigne la ligne responsable. La réponse d’ObjectStack est une barrière d’applicabilité à la compilation — validateRlsPredicateEnforceability parcourt au build chaque using et chaque check déclarés et rejette, en tant qu’erreur, tout prédicat qui ne s’appliquerait jamais. Ce qui rend cette barrière digne de confiance, c’est qu’elle ne modélise pas le runtime et ne cherche pas à le reconnaître par motifs : elle appelle la procédure de décision du runtime lui-même, isSupportedRlsExpression, sur l’entrée même que consulte le compilateur, si bien que « rejeté par le linter » et « abandonné sans application » sont le même booléen et ne peuvent pas diverger. Voilà l’artefact à exiger de n’importe quelle plateforme. Pas « prenez-vous en charge la sécurité au niveau des lignes ? » — tout le monde répond oui. Demandez si le build peut rejeter une règle de sécurité qui, silencieusement, ne ferait rien.',
  ],
  alsoKnownAs: ['RLS', 'row-level security', 'sécurité au niveau des enregistrements', 'contrôle d’accès par ligne'],
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
