import { beers$, editions$ } from '@/lib/SupaLegend';
import { observer, useValue } from '@legendapp/state/react';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Filter from '../common/filter';
import BeerItem from './beer-item';

const BeersList = observer(() => {
    const [filter, setFilter] = React.useState<string>('all');

    const beersList = useValue(beers$);
    const editions = useValue(editions$);

    if (!beersList || !editions) return <ActivityIndicator />;

    const activeEdition = Object.values(editions).find((ed) => ed.active);

    if (!activeEdition) {
        console.error('No active edition found');
        return (
            <View>
                <Text>No active edition found</Text>
            </View>
        );
    }

    const beers = Object.values(beersList)
        .filter((b) => b.edition === activeEdition.id)
        .filter((b) => filter === 'all' || b.container === filter)
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <View className='flex items-center'>
            <View className='flex flex-row justify-around gap-x-4 py-3'>
                <Filter label='Toutes' selected={filter === 'all'} action={() => setFilter('all')} />
                <Filter label='Au fût' selected={filter === 'Fût'} action={() => setFilter('Fût')} />
                <Filter
                    label='En bouteille'
                    selected={filter === 'Bouteille'}
                    action={() => setFilter('Bouteille')}
                />
            </View>
            <FlatList
                className='flex px-4'
                data={beers}
                renderItem={({ item }) => <BeerItem beer={item} />}
                contentContainerStyle={{ paddingBottom: 280 }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
});

export default BeersList;
