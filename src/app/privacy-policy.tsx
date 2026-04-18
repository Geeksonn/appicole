import SubPageContainer from '@/components/common/sub-page-container';
import Legal from '@/components/profile/legal';
import { ArticleProps } from '@/components/profile/legal-articles';

export default function PrivacyPolicy() {
    const articles: ArticleProps[] = [
        {
            title: '1. Introduction',
            article: `Cette politique de confidentialité décrit la manière dont les données personnelles sont collectées et utilisées dans le cadre de l’application Appicole.

L’application est proposée dans le cadre de l’événement La Brassicole, organisé par un groupe de bénévoles (ci-après « les organisateurs »).

L’utilisation de l’application implique l’acceptation de la présente politique.`,
        },
        {
            title: '2. Responsable du traitement',
            article: `Le responsable du traitement des données est :
Les organisateurs de La Brassicole
Contact : info@brassicole.be`,
        },
        {
            title: '3. Données collectées',
            article: `Lors de l’utilisation de l’application, les données suivantes peuvent être collectées :
•	Adresse e-mail (via connexion Google ou Facebook)

Aucune autre donnée personnelle n’est collectée sans votre consentement.`,
        },
        {
            title: '4. Finalité et base légale',
            article: `Les données sont collectées afin de :
•	créer et gérer votre compte utilisateur ;
•	sauvegarder vos bières favorites ;
•	enregistrer vos notes et préférences.

Base légale :
•	Exécution du service (fonctionnement du compte utilisateur)`,
        },
        {
            title: '5. Fournisseurs tiers',
            article: `L’authentification peut être réalisée via des services tiers tels que :
•	Google
•	Apple

Ces services peuvent traiter certaines données conformément à leurs propres politiques de confidentialité.`,
        },
        {
            title: '6. Durée de conservation',
            article: `Votre adresse e-mail est conservée pendant une durée maximale de 2 ans après votre dernière connexion.

Chaque nouvelle connexion prolonge cette durée de 2 ans.`,
        },
        {
            title: '7. Vos droits',
            article: `Conformément au RGPD, vous disposez des droits suivants :
•	droit d’accès à vos données ;
•	droit de rectification ;
•	droit à l’effacement ;
•	droit à la limitation du traitement ;
•	droit à la portabilité des données.

Vous pouvez exercer ces droits en contactant :
📧 info@brassicole.be`,
        },
        {
            title: '8. Droit de réclamation',
            article: `Vous avez également le droit d’introduire une réclamation auprès de l’autorité compétente :

Autorité de protection des données (Belgique)`,
        },
        {
            title: '9. Contact',
            article: `Pour toute question relative à cette politique :
📧 info@brassicole.be`,
        },
    ];

    return (
        <SubPageContainer title='Politique de Confidentialité'>
            <Legal updated='21/10/2023' articles={articles} />
        </SubPageContainer>
    );
}
