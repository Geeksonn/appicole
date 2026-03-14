import { getRatingAndVotes } from '@/lib/ratings';
import { beers$, editions$, userRatings$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import { observer, useValue } from '@legendapp/state/react';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Filter from '../common/filter';
import BeerItem from './beer-item';

const BeersList = observer(() => {
    const [filter, setFilter] = React.useState<string>('all');

    const beersList = useValue(beers$);
    const editions = useValue(editions$);
    const userRatings = useValue(userRatings$);

    if (!beersList || !editions || !userRatings) return <ActivityIndicator />;

    const activeEdition = Object.values(editions).find((ed) => ed.active);

    if (!activeEdition) {
        console.error('No active edition found');
        return (
            <View>
                <Text>No active edition found</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Beer }) => {
        const { rating, nbVotes } = getRatingAndVotes(item.id, Object.values(userRatings));
        return <BeerItem beer={item} rating={rating} numberOfVotes={nbVotes} showCaveIcon={true} />;
    };

    const beers = Object.values(beersList)
        .filter((b) => b.edition === activeEdition.id)
        .filter((b) => filter === 'all' || b.container === filter)
        .sort((a, b) => a.name.localeCompare(b.name));
    return (
        <View className='flex items-center mb-72 bg-background'>
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
                className='bg-background flex px-4'
                data={beers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
});

export default BeersList;
