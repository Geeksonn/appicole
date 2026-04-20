import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

type Props = {
    action: (code: string) => void;
};

const AddBadge: React.FC<Props> = ({ action }) => {
    const [code, setCode] = React.useState<string>('');

    return (
        <View className='flex flex-col gap-y-8 mb-8'>
            <Text className='font-bold text-accent-green text-lg text-center'>Entrez le code du badge</Text>
            <View className='flex flex-row items-center justify-center gap-x-4'>
                <TextInput
                    placeholder='Code du badge'
                    onChangeText={setCode}
                    value={code}
                    className='w-8/12 p-3 rounded-lg border border-gray-400'
                />
                <Pressable
                    className='flex flex-row justify-center bg-accent-orange rounded-2xl px-5 py-2'
                    onPress={() => action(code)}>
                    {/*<Text className='text-white'>Valider</Text>*/}
                    <Ionicons name='checkmark' size={24} color='white' />
                </Pressable>
            </View>
        </View>
    );
};

export default AddBadge;