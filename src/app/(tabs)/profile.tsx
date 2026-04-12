import { useAuth } from '@/components/common/auth-provider';
import LargeButton from '@/components/common/large-button';
import MainScreenContainer from '@/components/common/main-screen-container';
import LoginScreen from '@/components/profile/login-screen';
import { supabase } from '@/lib/queries';
import { currentUser$ } from '@/lib/SupaLegend';
import { observer } from '@legendapp/state/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default observer(function ProfileScreen() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { session } = useAuth();
    const router = useRouter();

    if (!session) {
        return (
            <MainScreenContainer title='Connexion'>
                <LoginScreen />
            </MainScreenContainer>
        );
    }

    const profile = currentUser$.profile.get();

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
    };

    if (loading) {
        return (
            <MainScreenContainer title='Mon Profil'>
                <ActivityIndicator size={34} color='rgba(230, 94, 68, 1)' className='my-3' />
            </MainScreenContainer>
        );
    }

    return (
        <MainScreenContainer title='Mon Profil'>
            <View className='w-11/12 mx-auto'>
                {/*}
                <ProfileHeader name={profile?.email || ''} />
                */}

                <View className='flex flex-row justify-between py-5 px-4 border-b border-b-gray-300'>
                    <Text className='font-semibold text-accent-green'>Mon e-mail</Text>
                    <Text className='text-gray-400 text-right'>{profile?.email || ''}</Text>
                </View>
                <Pressable
                    className='py-5 px-8 border-b border-b-gray-300'
                    onPress={() => router.push('/cave')}>
                    <Text className='font-semibold text-accent-green'>Mes vidanges</Text>

                    <Text className='text-gray-400'>Retrouvez ici toutes vos bières bues</Text>
                </Pressable>

                <Pressable
                    className='py-5 px-8 border-b border-b-gray-300'
                    onPress={() => console.log('TODO: vidanges')}>
                    <Text className='font-semibold text-accent-green'>Mes badges</Text>

                    <Text className='text-gray-400'>Retrouvez ici tous les badges à collectionner</Text>
                </Pressable>

                <View className='mt-5'>
                    <LargeButton
                        title='Détails & Réglages'
                        onPress={() => console.log('TODO: navigate to settings')}
                        customBgColor='bg-accent-green'
                    />
                    <LargeButton title='Se déconnecter' onPress={() => handleLogout()} />
                </View>
            </View>
        </MainScreenContainer>
    );
});
