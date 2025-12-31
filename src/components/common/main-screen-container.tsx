import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';

type Props = {
    title: string;
    children: React.ReactNode;
};

const MainScreenContainer: React.FC<Props> = ({ title, children }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Header title={title} />
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default MainScreenContainer;