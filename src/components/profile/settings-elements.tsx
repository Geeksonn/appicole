import { Href, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export type InfoElement = {
    id: number;
    elementKey: string;
    value: string | React.ReactNode;
    link?: Href;
};

type Props = {
    title: string;
    elements: InfoElement[];
};

const InfoElement: React.FunctionComponent<InfoElement> = (info) => {
    const router = useRouter();

    const content: React.ReactNode = (
        <>
            <Text className='text-gray-500 text-xs'>{info.elementKey}</Text>
            <Text className='text-gray-500 text-xs'>{info.value}</Text>
        </>
    );

    const className =
        'flex flex-row justify-between items-center px-4 py-5 border-b border-b-separator last:border-b-0';

    if (info.link) {
        return (
            <Pressable className={className} onPress={() => router.push(info.link!)}>
                {content}
            </Pressable>
        );
    } else {
        return <View className={className}>{content}</View>;
    }
};

const SettingsElement: React.FC<Props> = ({ title, elements }) => {
    return (
        <View className='w-full'>
            <Text className='px-4 pt-6 pb-3 border-b border-b-separator bg-white text-accent-green text-base font-semibold'>
                {title}
            </Text>
            <FlatList
                data={elements}
                renderItem={({ item }) => <InfoElement {...item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default SettingsElement;
