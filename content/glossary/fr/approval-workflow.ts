import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'approval-workflow',
  term: 'Workflow d’approbation',
  title: 'Workflow d’approbation : définition, routage, et où se trouve vraiment l’échéance',
  description:
    'Un workflow d’approbation bloque une modification proposée jusqu’à ce qu’une personne responsable enregistre une décision explicite — routée par rôle et non par nom, et consignée avant que la modification n’avance.',
  definition:
    'Un workflow d’approbation est un processus métier dans lequel une modification proposée reste en attente jusqu’à ce qu’une personne habilitée à décider enregistre une approbation ou un rejet explicite, de sorte que la modification ne prend effet qu’après qu’une personne responsable l’a signée.',
  explanation: [
    'Les workflows d’approbation sont bien antérieurs aux logiciels de workflow — demandes d’achat, comités consultatifs des changements, comités de crédit et validation des essais cliniques encodent tous le même schéma. Trois propriétés séparent un vrai workflow d’approbation d’une notification qui se contente d’y ressembler. La modification doit être réellement bloquée tant que la demande est en attente, au lieu de se poursuivre pendant qu’un e-mail reste non lu. La décision doit être imputable à une personne qui détenait l’autorité au moment où elle a décidé, et non à une boîte partagée. Et le routage doit se résoudre par rapport à l’organisation plutôt que par rapport à des noms, car une chaîne câblée sur des personnes précises est une chaîne qui casse sans bruit à la prochaine réorganisation et renvoie la demande vers quelqu’un qui est parti. Un processus qui ne remplit aucune de ces conditions n’est qu’une notification avec un délai.',
    'Dans ObjectStack, une approbation n’est pas un système à part mais un nœud durable à l’intérieur d’un flow : l’exécution atteint le nœud d’approbation, ouvre une demande, se suspend, puis reprend par son arête sortante approve ou reject une fois la décision enregistrée. Les approbateurs se déclarent comme un utilisateur, un rôle, une équipe ou la hiérarchie managériale du demandeur, et se résolvent contre l’identité en vigueur au moment de la demande — un poste s’étend à la personne qui l’occupe actuellement. L’étape fixe son propre comportement, si bien qu’un nœud peut fonctionner en « la première réponse l’emporte » et le suivant en « unanimité » ; lockRecord fige l’enregistrement pour que personne ne le modifie dans le dos du relecteur ; maxRevisions borne la boucle de renvoi pour qu’une demande ne puisse pas tourner indéfiniment autour de « merci de réviser » ; et onEmptyApprovers décide de ce qui se passe quand la liste des approbateurs ne désigne finalement personne, avec par défaut un recours à un administrateur plutôt qu’un passage silencieux de l’enregistrement. La décision est écrite dans le journal d’audit avant que l’exécution n’avance, si bien qu’aucun chemin ne permet de dépasser une approbation sans décision enregistrée. Ce que porte un nœud d’approbation, c’est une décision métier, comme une remise, un remboursement ou un achat. Les modifications qu’une IA apporte à l’application elle-même empruntent un autre chemin jusqu’à une personne : sur ObjectStack open source, la modification d’un agent de code est une métadonnée dans un diff git que quelqu’un relit, et sur ObjectOS Cloud, une modification faite par AI Builder sur une application en service qui contient déjà des enregistrements est enregistrée comme brouillon qu’une personne devra publier — c’est ce qui fait d’un logiciel écrit par un agent quelque chose qu’une personne peut signer plutôt que découvrir après coup.',
    'La question à poser à tout moteur d’approbation est de savoir où se trouve son échéance, et ici la réponse honnête est étroite. Un nœud d’attente (wait) dans un flow n’a aucun délai d’expiration : deux clés ont un temps prétendu le contraire, et toutes deux ont été retirées plutôt que laissées en place comme une promesse que le runtime ne tient pas. L’escalade n’existe que sur le nœud d’approbation, sous forme de SLA par nœud et non de service de minuterie global. Renseignez timeoutHours, et un balayage repère les demandes toujours en attente au-delà de ce nombre d’heures depuis leur création et escalade chacune au plus une fois, et jamais davantage, en exécutant l’action configurée — notify, reassign, auto_approve ou auto_reject —, escalateTo désignant un utilisateur ou un poste étendu à ses titulaires actuels, et la ligne d’audit de l’escalade étant écrite en premier, pour qu’un balayage interrompu par un crash ou répété ne puisse pas se déclencher deux fois. La conséquence de conception mérite d’être dite clairement : si une étape doit être bornée dans le temps, modélisez-la comme une approbation avec SLA, ou pilotez l’échéance depuis l’extérieur du flow. Une simple attente attendra patiemment, correctement, et pour toujours.',
  ],
  alsoKnownAs: [
    'circuit d’approbation',
    'circuit de validation',
    'workflow de validation',
    'approbation à plusieurs niveaux',
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
