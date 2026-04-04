import React from 'react';

import { Beer } from '@/lib/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { Pressable, Text, View } from 'react-native';
import LargeButton from '../common/large-button';

type Props = {
    beer: Beer;
    close: () => void;
    confirmRating: (rating: number) => void;
};

const ModalRateBeer: React.FC<Props> = ({ beer, close, confirmRating }) => {
    const [rating, setRating] = React.useState<number>(2.5);

    return (
        <Pressable className='w-full h-full bg-black/50 absolute top-0 z-20' onPress={() => close()}>
            <View
                className='p-4 w-full h-5/12 bg-white rounded-t-2xl absolute bottom-0 z-30'
                onStartShouldSetResponder={() => true}>
                <View className='flex flex-row justify-end'>
                    <Ionicons name='close' size={32} color='#004235' onPress={() => close()} />
                </View>
                <Text className='-mt-4 text-accent-yellow text-5xl text-center'>{beer.name}</Text>

                <View className='flex gap-y-1 mt-7'>
                    <Text className='text-accent-green font-[title] text-2xl font-bold text-center'>
                        Notons cette bière
                    </Text>
                    <Text className='text-accent-green text-xs font-light text-center'>
                        et ajoutons-la à vos vidanges
                    </Text>
                </View>

                <View className='w-4/5 mx-auto mt-6 mb-1'>
                    <Slider
                        minimumValue={0}
                        maximumValue={5}
                        step={0.25}
                        value={rating}
                        minimumTrackTintColor='#F59F00'
                        onValueChange={setRating}
                    />
                </View>

                <Text className='w-20 mx-auto mb-6 bg-accent-yellow text-white text-sm text-center px-5 py-2 rounded-full'>
                    {rating}
                </Text>
                <LargeButton title='Confirmer' onPress={() => confirmRating(rating)} />
            </View>
        </Pressable>
    );
};

export default ModalRateBeer;
