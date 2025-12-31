import React from 'react';

import MainScreenContainer from '@/components/common/main-screen-container';
import EventItem from '@/components/planning/event-item';
import { getPlanningData } from '@/lib/planning';
import { FlatList } from 'react-native';

export default function Planning() {
    const [planningEvents, setPlanningEvents] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        const fetchPlanningEvents = async () => {
            setPlanningEvents(await getPlanningData());
        }
        fetchPlanningEvents();
    }, []);

    return (
        <MainScreenContainer title={`Et c'est parti !`}>
            <FlatList className='bg-background flex px-4 pt-4' data={planningEvents} keyExtractor={item => item.id}
                renderItem={({item}) => <EventItem eventData={item} />}>
            </FlatList>
        </MainScreenContainer>
    );
}
