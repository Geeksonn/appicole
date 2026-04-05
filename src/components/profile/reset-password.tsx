import { supabase } from '@/lib/queries';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import LargeButton from '../common/large-button';
import TextInputElement from '../common/text-input-element';

type Props = {
    back: () => void;
};

const ResetPassword: React.FC<Props> = ({ back }) => {
    const [email, setEmail] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);

    const router = useRouter();

    const handleResetPassword = async () => {
        setLoading(true);
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'appicole://reset-password',
        });
        setLoading(false);
        setSuccess(true);
    };

    if (loading) {
        <View className='flex gap-y-4 w-4/5 mx-auto'>
            <Text className='text-accent-green font-semibold text-lg text-center'>
                Réinitialiser son mot de passe
            </Text>
            <ActivityIndicator size={34} color='rgba(230, 94, 68, 1)' className='my-3' />
        </View>;
    }

    if (success) {
        setTimeout(() => back(), 5000);
        return (
            <View className='w-4/5 mx-auto p-3 rounded-lg border border-green-600 bg-green-200'>
                <Text className='text-green-600 font-light text-xs'>
                    Un e-mail de réinitialisation de mot de passe a été envoyé à l'adresse {email}. Pense à
                    vérifier tes spams !
                </Text>
            </View>
        );
    }

    return (
        <View className='flex gap-y-4 w-4/5 mx-auto'>
            <Text className='text-accent-green font-semibold text-lg text-center'>
                Réinitialiser son mot de passe
            </Text>
            <TextInputElement
                placeholder='Email'
                contentType='emailAddress'
                onChange={setEmail}
                value={email}
            />
            <LargeButton title='Envoyer' onPress={handleResetPassword} />
            <Pressable className='flex flex-row gap-x-1 items-center mt-5' onPress={back}>
                <Ionicons name='arrow-back' size={22} color='rgba(230, 94, 68, 1)' />
                <Text className='text-accent-orange text-sm'>Retour</Text>
            </Pressable>
        </View>
    );
};

export default ResetPassword;
