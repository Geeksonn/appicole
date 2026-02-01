import { getRatingAndVotes } from '@/lib/ratings';
import { beers$, editions$, userRatings$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import { observer, useValue } from '@legendapp/state/react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import BeerItem from './beer-item';

const BeersList = observer(() => {
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
        return <BeerItem beer={item} rating={rating} numberOfVotes={nbVotes} showCaveIcon={false} />;
    };

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
});

export default BeersList;
