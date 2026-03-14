import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { AddToCaveIcon, AlreadyInCaveIcon } from './icons';

type Props = {
    id: string;
    toggleRateBeer: () => void;
    rating?: number;
};

const BeerCaveIcon: React.FunctionComponent<Props> = ({ id, toggleRateBeer, rating = -1 }) => {
    const isAlreadyInCave = rating >= 0;

    const addToCave = (e: GestureResponderEvent) => {
        if (!isAlreadyInCave) {
            e.preventDefault();
            toggleRateBeer();
        }
    };
    return (
        <TouchableOpacity
            className='border-brass-grey rounded-full text-brass-grey'
            onPress={(e) => addToCave(e)}>
            {isAlreadyInCave ? <AlreadyInCaveIcon /> : <AddToCaveIcon />}
        </TouchableOpacity>
    );
};

export default BeerCaveIcon;
