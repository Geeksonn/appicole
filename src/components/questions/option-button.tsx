import { OptionsForQuestion } from '@/lib/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SelectedOption } from './icons';

type Props = {
    selected: boolean;
    option: OptionsForQuestion;
    onPress: () => void;
};

const OptionButton: React.FC<Props> = ({ selected, option, onPress }) => {
    return (
        <TouchableOpacity
            className={`bg-white w-full mx-auto rounded-xl drop-shadow-[0_0_20px_rgba(0,0,0,0.05)] py-4 px-6 my-2 ${
                selected ? 'border-4 border-accent-yellow' : ' border-4 border-white'
            }`}
            onPress={() => onPress()}>
            <View className='flex flex-row items-center gap-x-4'>
                {selected && <SelectedOption />}
                <Text className='text-accent-green text-xl'>{option.option}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default OptionButton;
