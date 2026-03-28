import Svg, { Circle, Path } from 'react-native-svg';

export const ProgressInactive: React.FunctionComponent = () => {
    return (
        <Svg width={26} height={26} viewBox='0 0 26 26' fill='none'>
            <Circle cx={13} cy={13} r={13} transform='rotate(90 13 13)' fill='#C4C4C4' />
            <Circle cx={13} cy={13} r={11} transform='rotate(90 13 13)' fill='#F8F8F8' />
        </Svg>
    );
};

export const ProgressActive: React.FunctionComponent = () => {
    return (
        <Svg width={26} height={26} viewBox='0 0 26 26' fill='none'>
            <Circle cx={13} cy={13} r={13} transform='rotate(90 13 13)' fill='#F59F00' />
            <Circle cx={13} cy={13} r={11} transform='rotate(90 13 13)' fill='#F8F8F8' />
        </Svg>
    );
};

export const ProgressLinker: React.FunctionComponent = () => {
    return (
        <Svg width={25} height={2} fill='none'>
            <Path transform='rotate(90 86 0)' fill='#C4C4C4' d='M86 0H88V86H86z' />
        </Svg>
    );
};

export const SelectedOption: React.FunctionComponent = () => {
    return (
        <Svg width={25} height={19} viewBox='0 0 25 19' fill='none'>
            <Path d='M22.948 2.75l-13.5 13.5-6.75-6.75' stroke='#F59F00' />
        </Svg>
    );
};

export const ProgressEnd: React.FunctionComponent = () => {
    return (
        <Svg width={26} height={26} viewBox='0 0 26 26' fill='none'>
            <Circle cx={13} cy={13} r={13} transform='rotate(90 13 13)' fill='#F59F00' />
        </Svg>
    );
};

export const ProgressRedo: React.FC = () => {
    return (
        <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' stroke='#FFFFFF'>
            <Path d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
        </Svg>
    );
};
