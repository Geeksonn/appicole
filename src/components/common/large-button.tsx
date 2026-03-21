import { Text, TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

const LargeButton: React.FC<Props> = ({ title, onPress }) => {
    return (
        <TouchableOpacity className='mt-3 py-4 bg-accent-orange rounded-lg' onPress={onPress}>
            <Text className='text-sm font-medium text-white text-center'>{title}</Text>
        </TouchableOpacity>
    );
};

export default LargeButton;
