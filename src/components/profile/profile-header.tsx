import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    image?: string;
    name: string;
};

const ProfileHeader: React.FC<Props> = ({ image = '', name }) => {
    return (
        <View className='flex items-center w-full pb-8 bg-white'>
            {/*<Image source={image} contentFit='contain' style={{ flex: 1 }} />*/}
            <Text className='mt-4 font-[title] font-semibold text-3xl text-accent-green'>{name}</Text>
        </View>
    );
};

export default ProfileHeader;
