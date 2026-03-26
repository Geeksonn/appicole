import SubPageContainer from '@/components/common/sub-page-container';
import { beers$, routes$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useValue } from '@legendapp/state/react';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function RoutesScreen() {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
    const [beersInRoute, setBeersInRoute] = React.useState<Beer[]>([]);
    const beers = useValue(beers$);
    const routes = useValue(routes$);

    if (!beers || !routes) {
        return (
            <SubPageContainer title='Les Routes'>
                <ActivityIndicator />
            </SubPageContainer>
        );
    }

    const routeIds: string[] = Object.keys(routes);

    const getBeersForSelectedRoute = (): Beer[] => {
        let newBeers: Beer[] = [];
        for (const beer of routes[routeIds[selectedIndex]].beers) {
            newBeers[beer.order] = Object.values(beers).find((b) => b.id === beer.id)!;
        }

        return newBeers;
    };

    const renderBeerItem = ({ item }: { item: Beer }) => {
        return (
            <View className='flex gap-y-1 p-4 my-2 bg-white rounded-lg shadow'>
                <Text className='text-base font-semibold text-accent-green'>{item.name}</Text>
                <Text className='pl-3 text-sm text-gray-400'>{item.brewery}</Text>
                <Text className='pl-3 text-xs text-gray-400'>
                    {item.type} - IBU {item.ibu} - {item.degree_integer},{item.degree_decimal}%
                </Text>
            </View>
        );
    };

    const handleNext = () => {
        if (selectedIndex < routeIds.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const hasPrevious = selectedIndex > 0;
    const hasNext = selectedIndex < routeIds.length - 1;

    return (
        <SubPageContainer title='Les Routes'>
            <View className='flex flex-row items-center gap-x-6 mt-4 mb-6 mx-auto'>
                <TouchableOpacity className='' onPress={() => handlePrevious()} disabled={!hasPrevious}>
                    <Ionicons
                        name='arrow-back-outline'
                        size={32}
                        color={hasPrevious ? '#E65E44' : '#6a7282'}
                    />
                </TouchableOpacity>

                <View className='px-5 py-2 rounded-full bg-accent-orange w-1/2'>
                    <Text className='text-white text-center text-base'>
                        {Object.values(routes).find((r) => r.id === routeIds[selectedIndex])!.name}
                    </Text>
                </View>

                <TouchableOpacity className='' onPress={() => handleNext()} disabled={!hasNext}>
                    <Ionicons
                        name='arrow-forward-outline'
                        size={32}
                        color={hasNext ? '#E65E44' : '#6a7282'}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                className='px-16'
                data={getBeersForSelectedRoute()}
                renderItem={renderBeerItem}
                //contentContainerStyle={{ paddingBottom: 280 }}
                keyExtractor={(item) => item.id}
            />
        </SubPageContainer>
    );
}
