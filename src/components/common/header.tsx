import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return (
        <View className='bg-accent-green px-4 py-3'>
            <Text className='text-white font-semibold text-2xl'>{title}</Text>
        </View>
    );
};

export default Header;