import { beers$ as _beers$, editions$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import { observer, useValue } from '@legendapp/state/react';
import { FlatList, Text, View } from 'react-native';

const BeersList = observer(({ beers$ }: { beers$: typeof _beers$ }) => {
    const beersList = useValue(beers$);
    const editions = useValue(editions$);
    const activeEdition = Object.values(editions).find((ed) => ed.active);

    if (!activeEdition) {
        console.error('No active edition found');
        return (
            <View>
                <Text>No active edition found</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Beer }) => (
        <View className='mx-2 my-3'>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Text>{item.brewery}</Text>
        </View>
    );

    if (beersList) {
        const beers = Object.values(beersList)
            .filter((b) => b.edition === activeEdition.id)
            .sort((a, b) => a.name.localeCompare(b.name));
        return (
            <FlatList
                className='bg-background flex px-4 pt-4 mb-24'
                data={beers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }

    return <></>;
});

export default BeersList;
