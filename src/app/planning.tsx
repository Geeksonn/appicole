import React from 'react';

import MainScreenContainer from '@/components/common/main-screen-container';
import EventsList from '@/components/planning/events-list';
import { events$ as _events$ } from '@/lib/SupaLegend';

export default function Planning() {

    return (
        <MainScreenContainer title={`Et c'est parti !`}>
            <EventsList events$={_events$} />
        </MainScreenContainer>
    );
}
