import { supabase } from '@/lib/queries';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import LargeButton from '../common/large-button';
import TextInputElement from '../common/text-input-element';
import NewAccount from './new-account';
import ResetPassword from './reset-password';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [showResetPassword, setShowResetPassword] = React.useState<boolean>(false);
    const [showNewAccount, setShowNewAccount] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
        if (error) {
            console.error('Error during sign in', error);
            setError(
                `Une erreur est survenue lors de la connexion. Vérifie tes identifiants et assure-toi d'avoir confirmé ton e-mail`,
            );
        }

        setEmail('');
        setPassword('');
        setLoading(false);
    };

    if (showResetPassword) {
        return <ResetPassword back={() => setShowResetPassword(false)} />;
    }

    if (showNewAccount) {
        return <NewAccount back={() => setShowNewAccount(false)} />;
    }

    if (loading) {
        return (
            <View className='flex gap-y-4 w-4/5 mx-auto'>
                <Text className='text-accent-green font-semibold text-lg text-center'>Se connecter</Text>
                <ActivityIndicator size={34} color='rgba(230, 94, 68, 1)' className='my-3' />
            </View>
        );
    }

    return (
        <View className='flex gap-y-4 w-4/5 mx-auto'>
            <Text className='text-accent-green font-semibold text-lg text-center'>Se connecter</Text>
            {error ? (
                <View className='p-3 rounded-lg border border-red-600 bg-red-200'>
                    <Text className='text-red-600 text-xs font-light'>{error}</Text>
                </View>
            ) : null}

            <TextInputElement
                placeholder='Email'
                contentType='emailAddress'
                onChange={setEmail}
                value={email}
            />
            <TextInputElement
                placeholder='Password'
                contentType='password'
                onChange={setPassword}
                value={password}
                secure
            />
            <View className='flex flex-row justify-between'>
                <Pressable onPress={() => setShowResetPassword(true)}>
                    <Text className='text-accent-orange'>Mot de passe oublié?</Text>
                </Pressable>
                <Pressable onPress={() => setShowNewAccount(true)}>
                    <Text className='text-accent-orange'>Crée ton compte</Text>
                </Pressable>
            </View>
            <LargeButton title='Se connecter' onPress={() => handleLogin()} />
        </View>
    );
};

export default LoginScreen;
