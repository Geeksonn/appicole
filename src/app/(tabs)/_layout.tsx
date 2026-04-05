import React from 'react';

import { NativeTabs } from 'expo-router/unstable-native-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { DynamicColorIOS } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function TabsLayout() {
    return (
        <NativeTabs
            //blurEffect='systemDefault'
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
                <NativeTabs.Trigger.Label>Accueil</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf='house.fill' md='home' />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='menu'>
                <NativeTabs.Trigger.Label>La Carte</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf='menucard' md='menu' />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='planning'>
                <NativeTabs.Trigger.Label>Planning</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf='calendar.badge.clock' md='calendar_clock' />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='guide'>
                <NativeTabs.Trigger.Label>Guide</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf='arrow.triangle.turn.up.right.diamond' md='directions' />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='profile'>
                <NativeTabs.Trigger.Label>Profil</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf='person.crop.circle' md='account_circle' />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
