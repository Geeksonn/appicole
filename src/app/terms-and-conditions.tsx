import SubPageContainer from '@/components/common/sub-page-container';
import Legal from '@/components/profile/legal';
import { ArticleProps } from '@/components/profile/legal-articles';

export default function PrivacyPolicy() {
    const articles: ArticleProps[] = [
        {
            title: '1. Objet',
            article: `Les présentes Conditions d’Utilisation (ci-après « Conditions ») régissent l’accès et l’utilisation de l’application mobile Appicole (ci-après « l’Application »).
            
L’Application est proposée dans le cadre de l’événement La Brassicole, organisé annuellement par un groupe de bénévoles, et vise à améliorer l’expérience des visiteurs en leur permettant notamment de découvrir et déguster des bières artisanales ou moins connues.`,
        },
        {
            title: '2. Acceptation des conditions',
            article: `En téléchargeant, installant ou utilisant l’Application, vous acceptez sans réserve les présentes Conditions.
            
Si vous n’acceptez pas ces Conditions, vous êtes invité à ne pas utiliser l’Application.`,
        },
        {
            title: '3. Description des services',
            article: `L’Application permet notamment :
•	de consulter la carte des bières proposées lors de l’événement ;
•	d’accéder au planning des activités ;
•	d’utiliser un guide de dégustation personnalisé ;
•	de créer un compte utilisateur et de s’y connecter ;
•	de noter et évaluer les bières dégustées.
            
Des fonctionnalités supplémentaires pourront être ajoutées à l’avenir, telles que :
•	la participation à des jeux interactifs (quiz, escape game, etc.) ;
•	des expériences ludiques et immersives liées à l’événement.`,
        },
        {
            title: '4. Accès à l’application',
            article: `L’accès à l’Application est gratuit. Toutefois, l’accès à certains services peut nécessiter la création d’un compte.
            
L’utilisateur s’engage à fournir des informations exactes lors de son inscription et à les maintenir à jour.`,
        },
        {
            title: '5. Compte utilisateur',
            article: `L’utilisateur est responsable de la confidentialité de ses identifiants de connexion.
            
Toute activité réalisée depuis son compte est réputée avoir été effectuée par l’utilisateur.
            
En cas d’utilisation frauduleuse, l’utilisateur s’engage à en informer les organisateurs dans les plus brefs délais.`,
        },
        {
            title: '6. Utilisation de l’application',
            article: `L’utilisateur s’engage à utiliser l’Application :
•	conformément aux lois et réglementations en vigueur ;
•	de manière responsable et respectueuse ;
•	sans porter atteinte aux droits des tiers ou au bon fonctionnement de l’Application.

Il est notamment interdit :
•	de publier des contenus offensants, diffamatoires ou inappropriés ;
•	de tenter de perturber ou compromettre la sécurité de l’Application ;
•	d’utiliser l’Application à des fins commerciales non autorisées.`,
        },
        {
            title: '7. Contenu utilisateur',
            article: `Les notes, commentaires ou évaluations publiés par les utilisateurs restent leur responsabilité.
            
Les organisateurs se réservent le droit de supprimer tout contenu jugé inapproprié, sans préavis.`,
        },
        {
            title: '8. Propriété intellectuelle',
            article: `L’Application, ainsi que tous ses contenus (textes, images, logos, etc.), sont protégés par les lois relatives à la propriété intellectuelle.
            
Toute reproduction, modification ou exploitation non autorisée est interdite.`,
        },
        {
            title: '9. Responsabilité',
            article: `L’Application est fournie « en l’état », sans garantie d’aucune sorte.
            
Les organisateurs ne peuvent être tenus responsables :
•	d’éventuelles erreurs ou omissions dans les informations ;
•	d’une indisponibilité temporaire de l’Application ;
•	des dommages résultant de l’utilisation de l’Application.

L’Application ne remplace pas les recommandations en matière de consommation responsable d’alcool. 
L’utilisateur est invité à consommer avec modération.`,
        },
        {
            title: '10. Évolution des conditions',
            article: `Les présentes Conditions peuvent être modifiées à tout moment.
            
Les utilisateurs seront informés en cas de modification substantielle.`,
        },
        {
            title: '11. Durée et résiliation',
            article: `Les Conditions s’appliquent pendant toute la durée d’utilisation de l’Application.
            
Les organisateurs se réservent le droit de suspendre ou supprimer un compte en cas de non-respect des présentes Conditions.`,
        },
        {
            title: '12. Droit applicable',
            article: `Les présentes Conditions sont régies par le droit belge.
            
En cas de litige, les tribunaux compétents seront ceux du ressort du siège des organisateurs, sauf disposition légale contraire.`,
        },
        {
            title: '13. Contact',
            article: `Pour toute question relative aux présentes Conditions, vous pouvez contacter les organisateurs de l’événement La Brassicole à l’adresse suivante : info@brassicole.be`,
        },
    ];

    return (
        <SubPageContainer title='CGU'>
            <Legal updated='18/04/2026' articles={articles} />
        </SubPageContainer>
    );
}
