import React from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from '@/components/common/auth-provider';
import '@/global.css';
import * as observables from '@/lib/SupaLegend';
import { when } from '@legendapp/state';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loading, setLoading] = React.useState(true);
    const [loaded, error] = useFonts({
        title: require('@assets/fonts/Fraunces-Bold.ttf'),
    });

    React.useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                when(() => observables.events$.get()),
                when(() => observables.beers$.get()),
                when(() => observables.editions$.get()),
                when(() => observables.badges$.get()),
                when(() => observables.userRatings$.get()),
                when(() => observables.routes$.get()),
                when(() => observables.questionsAndOptions$.get()),
            ]);
            setLoading(false);
        };

        loadData();

        if ((loaded || error) && !loading) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, loading]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack screenOptions={{ contentStyle: { backgroundColor: '#FAFAFA' } }}>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='routes' options={{ headerShown: false }} />
                <Stack.Screen name='questions' options={{ headerShown: false }} />
                <Stack.Screen name='[beerId]' options={{ headerShown: false }} />
                <Stack.Screen name='cave' options={{ headerShown: false }} />
                <Stack.Screen name='badges' options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}
