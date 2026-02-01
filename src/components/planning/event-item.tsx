import { Event } from '@/lib/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';
import ItemCard from '../common/item-card';

type Props = {
    eventData: Event;
};

const EventItem: React.FC<Props> = ({ eventData }) => {
    const getIconName = (icon: string): keyof typeof Ionicons.glyphMap => {
        switch (icon) {
            case 'restaurant':
                return 'restaurant-outline';
            case 'music':
                return 'musical-notes-outline';
            case 'bed':
                return 'bed-outline';
            case 'beer':
                return 'beer-outline';
            default:
                return 'calendar-clear-outline';
        }
    };

    return (
        <ItemCard className='flex gap-y-2 p-4 h-40'>
            <View className='flex flex-row gap-x-3 -mt-8 mx-auto items-center bg-accent-orange rounded-full px-4 py-2'>
                <Ionicons name={getIconName(eventData.icon)} size={16} color='#FFFFFF' />
                <Text className='text-sm center text-white'>{eventData.time.substring(0, 5)}</Text>
            </View>

            <Text className='text-lg font-bold text-accent-green'>{eventData.title}</Text>
            <Text className='pt-2 text-base font-light text-grey'>{eventData.description}</Text>
        </ItemCard>
    );
};

export default EventItem;
