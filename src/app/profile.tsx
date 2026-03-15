import { useAuth } from '@/components/common/auth-provider';
import MainScreenContainer from '@/components/common/main-screen-container';
import { supabase } from '@/lib/queries';
import { currentUser$ } from '@/lib/SupaLegend';
import { observer } from '@legendapp/state/react';
import React from 'react';
import { Button, Text, TextInput } from 'react-native';

export default observer(function ProfileScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { session } = useAuth();

    const handleLogin = async () => {
        // onAuthStateChange s'occupe du reste automatiquement
        await supabase.auth.signInWithPassword({ email: email, password: password });
    };

    if (!session) {
        return (
            <MainScreenContainer title='Connexion'>
                <Text>Connecte-toi pour accéder à ton profil</Text>
                <TextInput
                    placeholder='Email'
                    textContentType='emailAddress'
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    placeholder='Password'
                    textContentType='password'
                    onChangeText={setPassword}
                    value={password}
                />
                <Button onPress={handleLogin} title='Se connecter' />
            </MainScreenContainer>
        );
    }

    const profile = currentUser$.profile.get();

    return (
        <MainScreenContainer title='Mon Profil'>
            <Text>E-mail: {profile?.email}</Text>
            <Button onPress={() => supabase.auth.signOut()} title='Déconnexion' />
        </MainScreenContainer>
    );
});
