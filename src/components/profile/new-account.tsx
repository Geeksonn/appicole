import { createUser, supabase } from '@/lib/queries';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import LargeButton from '../common/large-button';
import TextInputElement from '../common/text-input-element';

type Props = {
    back: () => void;
};

const NewAccount: React.FC<Props> = ({ back }) => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [pwError, setPwError] = React.useState<string | null>(null);
    const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

    const handleCreation = async () => {
        setPwError(null);
        if (password !== confirmPassword) {
            setPwError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await supabase.auth.signUp({ email: email, password: password });
            await createUser(email);
        } catch (error) {
            console.error('Error during sign up', error);
            setPwError('Une erreur est survenue lors de la création du compte');
        }

        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <View className='flex gap-y-4 w-4/5 mx-auto'>
                <Text className='text-accent-green font-semibold text-lg text-center'>Compte créé !</Text>
                <Text className='p-3 rounded-lg border border-green-600 bg-green-200 text-green-600'>
                    Ton compte a bien été créé. Un e-mail de confirmation t'a été envoyé, pense à vérifier tes
                    spams ! Merci de confirmer ton e-mail en cliquant sur le lien contenu dans l'e-mail, avant
                    de pouvoir te connecter.
                </Text>
            </View>
        );
    }

    return (
        <View className='flex gap-y-4 w-4/5 mx-auto'>
            <Text className='text-accent-green font-semibold text-lg text-center'>Crée ton compte</Text>
            <TextInputElement
                placeholder='Email'
                contentType='emailAddress'
                onChange={setEmail}
                value={email}
            />
            <TextInputElement
                placeholder='Mot de passe'
                contentType='password'
                onChange={setPassword}
                value={password}
                secure
            />
            <TextInputElement
                placeholder='Confirmer le mot de passe'
                contentType='password'
                onChange={setConfirmPassword}
                value={confirmPassword}
                secure
            />
            {pwError ? <Text className='-mt-2 text-xs font-light text-red-500'>{pwError}</Text> : null}
            <LargeButton title='Créer le compte' onPress={handleCreation} />
            <Pressable className='flex flex-row gap-x-1 items-center mt-5' onPress={back}>
                <Ionicons name='arrow-back' size={22} color='rgba(230, 94, 68, 1)' />
                <Text className='text-accent-orange text-sm'>Retour</Text>
            </Pressable>
        </View>
    );
};

export default NewAccount;
