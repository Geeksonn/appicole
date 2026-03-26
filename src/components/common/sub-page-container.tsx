import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

type Props = {
    title: string;
    backLink?: Href;
    children: React.ReactNode;
};

const BackArrowIcon: React.FC = () => {
    return (
        <Svg width={30} height={24} viewBox='0 0 30 24' fill='none'>
            <Path
                d='M28 13.5a1.5 1.5 0 000-3v3zM.94 10.94a1.5 1.5 0 000 2.12l9.545 9.547a1.5 1.5 0 102.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 10-2.122-2.122L.94 10.94zM28 10.5H2v3h26v-3z'
                fill='#004235'
            />
        </Svg>
    );
};

const SubPageContainer: React.FC<Props> = ({ title, backLink, children }) => {
    const router = useRouter();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View className='flex flex-row items-center gap-x-6 px-4 py-4 bg-white'>
                    <TouchableOpacity onPress={backLink ? () => router.push(backLink) : () => router.back()}>
                        {/*<BackArrowIcon />*/}
                        <Ionicons name='arrow-back-outline' size={38} color='#004235' />
                    </TouchableOpacity>
                    <Text className='title-h1'>{title}</Text>
                </View>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SubPageContainer;
