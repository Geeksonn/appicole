import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    label: string;
    selected: boolean;
    action: () => void;
    size?: 'sm' | 'xs';
};

const Filter: React.FC<Props> = ({ label, selected, action, size = 'sm' }) => {
    return (
        <TouchableOpacity onPress={action}>
            <View
                className={`px-4 py-1 rounded-full border border-accent-orange ${selected ? 'bg-accent-orange' : 'bg-background'}`}>
                <Text className={`text-${size} ${selected ? 'text-white' : 'text-accent-orange'}`}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Filter;
