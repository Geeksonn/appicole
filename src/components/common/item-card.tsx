import { View } from 'react-native';

type Props = {
    className?: string;
    children: React.ReactNode;
};

const ItemCard: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <View className={`mx-3 my-6 bg-white rounded-xl ring-2 ring-gray-300/10 shadow-lg ${className}`}>
            {children}
        </View>
    );
};

export default ItemCard;
