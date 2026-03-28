import { Beer } from '@/lib/types';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import LargeButton from '../common/large-button';

const BeerOverview: React.FunctionComponent<Beer> = (beer) => {
    const beerImgUrl = `${process.env.EXPO_PUBLIC_IMG_CDN}/${beer.image_card_path}`;
    const basicInfo = `${beer.degree_integer},${beer.degree_decimal}% - IBU ${beer.ibu} - EBC ${beer.ebc}`;

    return (
        <View className='flex flex-row content-stretch mt-10 bg-white rounded-lg px-3 py-5'>
            <View className='w-1/3 -mt-14'>
                <Image source={beerImgUrl} contentFit='contain' transition={1000} style={{ flex: 1 }} />
            </View>
            <View className='w-2/3 flex flex-col py-4'>
                <Text className='font-title font-semibold text-accent-green text-2xl'>{beer.name}</Text>
                <Text className='text-gray-500'>{beer.type}</Text>
                <Text className='text-gray-500 mb-4'>{basicInfo}</Text>

                <LargeButton
                    title='Consulter la bière'
                    onPress={() => console.log('TODO: Go to beer page')}
                />
            </View>
        </View>
    );
};

export default BeerOverview;
