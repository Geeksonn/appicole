import React from 'react';

import ItemCard from '@/components/common/item-card';
import { getRatingAndVotes } from '@/lib/ratings';
import { currentUser$, userRatings$ } from '@/lib/SupaLegend';
import { Beer } from '@/lib/types';
import { useValue } from '@legendapp/state/react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import BeerRating from './beer-rating';

type Props = {
    beer: Beer;
};

const BeerItem: React.FunctionComponent<Props> = ({ beer }) => {
    const userRatings = useValue(userRatings$);
    const currentUser = useValue(currentUser$);
    const router = useRouter();

    const { name, image_card_path, type, degree_integer, degree_decimal } = beer;
    const imgUrl = `${process.env.EXPO_PUBLIC_IMG_CDN}/${image_card_path}`;

    if (!userRatings || !currentUser) {
        console.error('[beer-item] User ratings or current user not loaded');
        router.push('/');
    }

    const { rating, nbVotes } = getRatingAndVotes(beer.id, Object.values(userRatings));

    return (
        <ItemCard
            className='flex flex-row justify-around h-36'
            onPress={() => router.push({ pathname: '/[beerId]', params: { beerId: beer.id } })}>
            <View className='w-1/3 -mt-7'>
                <Image source={imgUrl} contentFit='contain' transition={1000} style={{ flex: 1 }} />
            </View>
            <View className='flex w-2/3 py-2'>
                <Text className='font-[title] text-accent-green text-xl'>{name}</Text>
                <Text className='text-grey text-sm'>{`${type} - ${degree_integer},${degree_decimal} %`}</Text>
                <View className='flex flex-row justify-between mr-4 items-center mt-4'>
                    <BeerRating rating={rating} numberOfVotes={nbVotes} />
                </View>
            </View>
        </ItemCard>
    );
};

export default BeerItem;
