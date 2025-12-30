import Header from '@/components/common/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Planning() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className='bg-background'>
                <Header title='Planning' />
                <View className='m-4'>
                    <View className='flex flex-row gap-x-4'>
                        <Text className='text-base'>18:00</Text>
                        <Ionicons name='time-outline' size={16} color='#E65E44' />
                        <View>
                            <Text className='text-base font-semibold text-accent-green'>Repas</Text>
                            <Text className='flex-wrap text-base font-light text-grey'>Venez vous régaler avec une bonne bière. Lorem Ipsum sd dss ds sd sd sdd sdsds ssd sd ss </Text>
                        </View>
                    </View>

                    
                    <View className='flex flex-row gap-x-4'>
                        <Text className='text-base'>18:00</Text>
                        <Ionicons name='time-outline' size={16} color='#E65E44' />
                        <View>
                            <Text className='text-base font-semibold text-accent-green'>Repas</Text>
                            <Text className='text-base font-light text-grey'>Venez vous régaler avec une bonne bière.</Text>
                        </View>
                    </View>

                    
                    <View className='flex flex-row gap-x-4'>
                        <Text className='text-base'>18:00</Text>
                        <Ionicons name='time-outline' size={16} color='#E65E44' />
                        <View>
                            <Text className='text-base font-semibold text-accent-green'>Repas</Text>
                            <Text className='text-base font-light text-grey'>Venez vous régaler avec une bonne bière. Lorem Ipsum Doloret Sit.</Text>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
