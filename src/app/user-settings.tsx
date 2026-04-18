import React from 'react';

import SubPageContainer from '@/components/common/sub-page-container';
import SettingsElement, { InfoElement } from '@/components/profile/settings-elements';
import { currentUser$ } from '@/lib/SupaLegend';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useValue } from '@legendapp/state/react';
import { ActivityIndicator, View } from 'react-native';

export default function UserSettingsScreen() {
    const currentUser = useValue(currentUser$);

    if (!currentUser) {
        return (
            <SubPageContainer title='Réglages'>
                <ActivityIndicator />
            </SubPageContainer>
        );
    }

    const profileElements: InfoElement[] = [
        //{ elementKey: 'Nom', value: user?.name || 'n/a' },
        { id: 1, elementKey: 'E-mail', value: currentUser.profile?.email || 'n/a' },
        //{ elementKey: 'Connecté via', value: 'Google [TODO]' },  --> TBD how we can get this info
    ];

    const termsAndConditions: InfoElement[] = [
        {
            id: 1,
            elementKey: 'Consulter nos termes & conditions',
            value: <Ionicons name='chevron-forward' size={16} color='#99a1af' />,
            link: '/terms-and-conditions',
        },
        {
            id: 2,
            elementKey: 'Consulter notre politique de confidentialité',
            value: <Ionicons name='chevron-forward' size={16} color='#99a1af' />,
            link: '/privacy-policy',
        },
    ];

    return (
        <SubPageContainer title='Réglages'>
            <View className='p-4 my-4'>
                {/*
            <View className='w-full flex justify-center pt-12 bg-white'>
                <ProfilePic url={user?.picture || ''} />
            </View>
            */}
                <SettingsElement title='Profil' elements={profileElements} />

                <SettingsElement title='Mentions Légales' elements={termsAndConditions} />
            </View>
        </SubPageContainer>
    );
}
