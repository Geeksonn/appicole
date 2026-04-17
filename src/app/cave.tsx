import DropdownFilter from '@/components/common/dropdown-filter';
import SubPageContainer from '@/components/common/sub-page-container';
import BeerItem from '@/components/menu/beer-item';
import { beers$, currentUser$, editions$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import { useValue } from '@legendapp/state/react';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function CaveScreen() {
    const [selectedEdition, setSelectedEdition] = React.useState<string>('');
    const currentUser = useValue(currentUser$);
    const beers = useValue(beers$);
    const editions = useValue(editions$);

    if (!currentUser || !beers || !editions) {
        return (
            <SubPageContainer title='Mes vidanges'>
                <ActivityIndicator />
            </SubPageContainer>
        );
    }

    if (!currentUser.profile || currentUser.profile.ratings.length === 0) {
        return (
            <SubPageContainer title='Mes vidanges'>
                <Text className='text-center'>
                    Ta cave est vide. Déguste et note ta première bière dès maintenant !
                </Text>
            </SubPageContainer>
        );
    }

    const caveItemIds = currentUser.profile.ratings.map((r) => r.beer);
    const caveList: Beer[] = Object.values(beers).filter(
        (b) => (selectedEdition !== '' ? b.edition === selectedEdition : true) && caveItemIds.includes(b.id),
    );

    const edFilters: { label: string; value: string }[] = [
        { label: 'Toutes les éditions', value: '' },
        ...Object.values(editions).map((e) => ({ label: e.name, value: e.id })),
    ];

    return (
        <SubPageContainer title='Mes vidanges'>
            <View className='flex flex-row items-center '>
                <DropdownFilter
                    items={edFilters}
                    selected={selectedEdition}
                    onSelect={(val: string) => setSelectedEdition(val)}
                />
            </View>
            <FlatList
                className='bg-background'
                data={caveList}
                renderItem={({ item }) => <BeerItem beer={item} />}
                contentContainerStyle={{ paddingBottom: 80 }}
                keyExtractor={(item) => item.id}
            />
        </SubPageContainer>
    );
}
