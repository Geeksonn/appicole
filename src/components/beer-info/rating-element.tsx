import React from 'react';

import { Text, View } from 'react-native';

type Props = {
    title: string;
    rating: string;
    ratingIcons: React.ReactNode[];
};

const RatingElement: React.FC<Props> = ({ title, rating, ratingIcons }) => {
    return (
        <View className='flex gap-y-2 w-2/5'>
            <Text className='font-semibold text-accent-green text-center pb-2'>{title}</Text>
            <Text className='text-2xl text-accent-green text-center'>{rating}</Text>
            <View className='flex flex-row justify-around gap-x-1'>{ratingIcons}</View>
        </View>
    );
};

export default RatingElement;
