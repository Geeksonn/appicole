import { events$ as _events$ } from '@/lib/SupaLegend';
import { Event } from '@/lib/types';
import { observer } from '@legendapp/state/react';
import { FlatList } from 'react-native';
import EventItem from './event-item';

const EventsList = observer(({ events$ }: { events$: typeof _events$ }) => {
    // Get the todos from the state and subscribe to updates

    const eventsBulk = events$.get();
    const renderItem = ({ item }: { item: Event }) => <EventItem eventData={item} />;
    if (eventsBulk) {
        const events = Object.values(eventsBulk)
            .filter((ev) => ev.edition === 'e6331a99-5d09-4c72-98e2-62c466113e0c')
            .sort((a, b) => a.order - b.order);
        return (
            <FlatList
                className='bg-background flex px-4 pt-4'
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }

    return <></>;
});

export default EventsList;
