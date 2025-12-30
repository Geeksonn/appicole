import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';

export default function RootLayout() {
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
