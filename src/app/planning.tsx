import React from 'react';

import MainScreenContainer from '@/components/common/main-screen-container';
import EventsList from '@/components/planning/events-list';

export default function Planning() {
    return (
        <MainScreenContainer title={`Et c'est parti !`}>
            <EventsList />
        </MainScreenContainer>
    );
}
