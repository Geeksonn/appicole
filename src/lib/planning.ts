export const getPlanningData = async () => {
    return [
        {
            id: 1,
            title: 'Repas',
            icon: 'restaurant',
            time: '18:00',
            description: `Venez déguster une bon repas accompagné d'une bière de votre choix.`,
        },
        {
            id: 2,
            title: 'Début de soirée',
            icon: 'calendar',
            time: '19:00',
            description: `Et c'est parti pour la 25e Brassicole !`,
        },
        {
            id: 3,
            title: 'Laura Poedts',
            icon: 'music',
            time: '20:30',
            description: `Premier concert de la soirée avec Laura.`,
        },
        {
            id: 4,
            title: 'Papy Hour !',
            time: '21:10',
            icon: 'beer',
            description: `Mettons à l'honneur les anciens Brassicoleurs.`,
        },
        {
            id: 5,
            title: 'Little Sister',
            icon: 'music',
            time: '21:15',
            description: `Second concert avec les Little Sister.`,
        },
        {
            id: 6,
            title: 'Dads After Eight',
            icon: 'music',
            time: '22:00',
            description: `Dernier concert de la soirée avec les Dads After Eight.`,
        },
        {
            id: 7,
            title: 'Clap de fin',
            icon: 'bed',
            time: '05:00',
            description: `Clôture de cette 25e édition.`,
        },
    ];
};
