import { TouchableOpacity, View } from 'react-native';

type Props = {
    className?: string;
    children: React.ReactNode;
    onPress?: () => void;
};

const ItemCard: React.FC<Props> = ({ children, className = '', onPress = null }) => {
    if (onPress) {
        return (
            <TouchableOpacity
                className={`mx-3 my-6 bg-white rounded-xl ring-2 ring-gray-300/10 shadow-lg ${className}`}
                onPress={onPress}>
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View className={`mx-3 my-6 bg-white rounded-xl ring-2 ring-gray-300/10 shadow-lg ${className}`}>
            {children}
        </View>
    );
};

export default ItemCard;
