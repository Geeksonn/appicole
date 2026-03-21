import LargeButton from '@/components/common/large-button';
import MainScreenContainer from '@/components/common/main-screen-container';
import { Text, View } from 'react-native';

export default function Guide() {
    return (
        <MainScreenContainer title={`On vous guide`}>
            <View className='p-4'>
                <Text className='title-h3'>Laissez-nous vous inspirer !</Text>
                <Text className='text-accent-green mt-3 mb-1'>
                    {`Vous êtes perdus dans le menu et ne savez pas choisir ?`}
                </Text>
                <Text className='text-accent-green my-1'>
                    {`Pas de panique ! Nous sommes là pour vous aider. Choisissez l'un de nos guide ci-dessous et c'est parti !`}
                </Text>
            </View>

            <View className='p-4'>
                <Text className='text-accent-green font-semibold text-base'>
                    Découvrez nos différentes routes
                </Text>
                <Text className='mt-3 text-gray-500'>
                    {`Nos routes cosistent en une sélection de bières ordonnées pour une dégustation optimale.`}
                </Text>
                <LargeButton title='Découvrir les routes' onPress={() => console.log('Discover routes')} />
            </View>

            <View className='p-4'>
                <Text className='text-accent-green font-semibold text-base'>On vous aide à choisir</Text>
                <Text className='mt-3 text-gray-500'>
                    {`Nous avons préparé une série de questions afin de déterminer LA bière qui vous correspond.`}
                </Text>
                <LargeButton title='Utiliser notre guide' onPress={() => console.log('Guided questions')} />
            </View>
        </MainScreenContainer>
    );
}
