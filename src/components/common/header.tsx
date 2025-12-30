import React from 'react';
import { Text, View } from 'react-native';
import Logo from './logo';

type Props = {
    title: string;
};

const Header: React.FC<Props> = ({ title }) => {
    return (
        <View className='flex flex-row items-center gap-x-6 px-4 mb-4 bg-white'>
            <View>
                <Logo width={58} height={66} />
            </View>
            <Text className='text-3xl font-[title] text-accent-green'>{title}</Text>
        </View>
    );
    /*
    return (
        <View className='bg-accent-green px-4 py-3'>
            <Text className='text-white font-semibold text-2xl'>{title}</Text>
        </View>
    );
    */
};

export default Header;

/*
import Logo from '../logo';
import HeaderContainer from './headerContainer';

type HeaderProps = {
    title: string;
};

const HeaderEdition: React.FunctionComponent<HeaderProps> = ({ title }) => {
    //const activeEdition: Promise<EditionType> = getActiveEdition();
    // TODO ...

    return (
        
            <HeaderContainer>
                <div>
                    <Logo />
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm tracking-wider uppercase'>
                        Brassicole édition 25
                    </p>
                    <h1>{title}</h1>
                </div>
            </HeaderContainer>
        
    );
};

export default HeaderEdition;
*/
