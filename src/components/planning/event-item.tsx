import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    eventData: any;
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
        <>
            <View className='mb-6 last:mb-0 ml-7 mr-5 pl-10 rounded-xl shadow-lg bg-white p-4'>
                <View className='flex items-center gap-y-1 absolute -top-1 -left-8 bg-accent-orange/30 w-18 px-3 py-1 rounded-full'>
                    <Text className='text-base center text-black'>{eventData.time}</Text>
                </View>

                <View className='flex flex-row items-center gap-x-2'>
                    <View className='flex items-center bg-accent-green rounded-full px-3 py-2'>
                        <Ionicons name={getIconName(eventData.icon)} size={16} color='#FFFFFF' />
                    </View>
                    <Text className='text-lg font-bold text-accent-green'>{eventData.title}</Text>
                </View>
                <Text className='pt-2 text-base font-light text-grey'>{eventData.description}</Text>
            </View>
        </>
    );
};

export default EventItem;
