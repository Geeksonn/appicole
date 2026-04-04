import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RatingElement from './rating-element';

type Props = {
    justVoted: boolean;
    usrRating: number;
    showRateBeer: () => void;
};

const UserRatingElement: React.FC<Props> = ({ justVoted, usrRating, showRateBeer }) => {
    if (justVoted) {
        return (
            <View className='flex gap-y-3 items-center flex-wrap'>
                <Ionicons name='checkmark-circle-outline' size={32} color='#008236' />
                <Text className='text-xs font-light text-green-700 flex-wrap'>
                    Bière ajoutée à votre cave !
                </Text>
            </View>
        );
    }

    if (usrRating >= 0) {
        return <RatingElement title='Ma note' rating={usrRating} />;
    }

    return (
        <TouchableOpacity className='px-3 py-2 bg-accent-orange rounded-lg' onPress={() => showRateBeer()}>
            <Text className='text-sm font-medium text-white text-center'>Noter la bière</Text>
        </TouchableOpacity>
    );
};

export default UserRatingElement;
