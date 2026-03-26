import React from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from '@/components/common/auth-provider';
import '@/global.css';
import { beers$, editions$, events$, userRatings$ } from '@/lib/SupaLegend';
import { when } from '@legendapp/state';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        title: require('@assets/fonts/Fraunces-Bold.ttf'),
    });

    React.useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                when(() => events$.get()),
                when(() => beers$.get()),
                when(() => editions$.get()),
                when(() => userRatings$.get()),
            ]);
        };

        loadData();

        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='routes' options={{ headerShown: false }} />
                <Stack.Screen name='questions' options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}
