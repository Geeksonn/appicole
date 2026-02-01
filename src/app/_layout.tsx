import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { DynamicColorIOS } from 'react-native';

import '@/global.css';
import { beers$, editions$, events$ } from '@/lib/SupaLegend';
import { when } from '@legendapp/state';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        title: require('@assets/fonts/SchibstedGrotesk-Bold.ttf'),
        //'title-semibold': require('@assets/fonts/SchibstedGrotesk-SemiBold.ttf'),
    });

    React.useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                when(() => events$.get()),
                when(() => beers$.get()),
                when(() => editions$.get()),
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
        <NativeTabs
            labelStyle={{
                // For the text color
                color: DynamicColorIOS({
                    dark: 'white',
                    light: 'black',
                }),
                selected: { color: '#E65E44' },
            }}
            // For the selected icon color
            tintColor={DynamicColorIOS({
                dark: '#E65E44',
                light: '#E65E44',
            })}>
            <NativeTabs.Trigger name='index'>
                <Label>Accueil</Label>
                {/*<Icon sf='house' drawable='custom_android_drawable' />*/}
                <Icon src={<VectorIcon family={Ionicons} name='home-outline' />} />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='menu'>
                <Label>La Carte</Label>
                {/*<Icon sf='menucard' drawable='custom_settings_drawable' />*/}
                <Icon src={<VectorIcon family={Ionicons} name='beer-outline' />} />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='planning'>
                <Label>Planning</Label>
                {/*<Icon sf='clock' drawable='custom_settings_drawable' />*/}
                <Icon src={<VectorIcon family={Ionicons} name='time-outline' />} />
            </NativeTabs.Trigger>

            {/*}
            <NativeTabs.Trigger name='guide'>
                <Label>Guide</Label>
                <Icon sf='questionmark.message' drawable='custom_settings_drawable' />
            </NativeTabs.Trigger>
            */}

            <NativeTabs.Trigger name='profile'>
                <Label>Profile</Label>
                {/*<Icon sf='person' drawable='custom_settings_drawable' />*/}
                <Icon src={<VectorIcon family={Ionicons} name='person-circle-outline' />} />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
