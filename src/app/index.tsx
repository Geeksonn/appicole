import MainScreenContainer from '@/components/common/main-screen-container';
import { Text, View } from 'react-native';

export default function Index() {
    return (
        <MainScreenContainer title='Brassicole'>
            <View className='m-4'>
                <Text>{`Bienvenue sur l'Appicole, l'application officielle de la Brassicole.`}</Text>
            </View>
        </MainScreenContainer>
    );
}
