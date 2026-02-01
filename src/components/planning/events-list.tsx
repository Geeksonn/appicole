import { events$ as _events$ } from '@/lib/SupaLegend';
import { Event } from '@/lib/types';
import { observer, useValue } from '@legendapp/state/react';
import { FlatList } from 'react-native';
import EventItem from './event-item';

const EventsList = observer(({ events$ }: { events$: typeof _events$ }) => {
    const eventsBulk = useValue(events$);
    const renderItem = ({ item }: { item: Event }) => <EventItem eventData={item} />;

    if (eventsBulk) {
        const events = Object.values(eventsBulk).sort((a, b) => a.order - b.order);
        return (
            <FlatList
                className='bg-background flex px-4 pt-4 mb-24'
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }

    return <></>;
});

export default EventsList;
