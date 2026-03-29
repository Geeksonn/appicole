import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    info: string;
};

const InfoPill: React.FC<Props> = ({ info }) => {
    return (
        <View className='w-18 py-1 rounded-full bg-gray-200'>
            <Text className='text-center text-xs text-accent-green font-light'>{info}</Text>
        </View>
    );
};

export default InfoPill;
