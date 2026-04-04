import React from 'react';

import { Text, View } from 'react-native';
import { NoVoteIcon, VoteEmptyIcon, VoteFilledIcon } from './icons';

type Props = {
    title: string;
    rating: number;
};

const RatingElement: React.FC<Props> = ({ title, rating }) => {
    const buildRating = (rating: number): React.ReactNode[] => {
        let jsx: React.ReactNode[] = [];

        if (rating > 0) {
            let ratingLeft = rating;
            for (let i = 0; i < 5; i++) {
                if (ratingLeft >= 0.5) {
                    jsx.push(<VoteFilledIcon key={`${title}_${i}`} />);
                } else {
                    jsx.push(<VoteEmptyIcon key={`${title}_${i}`} />);
                }

                ratingLeft--;
            }
        } else {
            for (let i = 0; i < 5; i++) {
                jsx.push(<NoVoteIcon key={`${title}_no_vote_${i}`} />);
            }
        }

        return jsx;
    };

    return (
        <View className='flex gap-y-2 w-2/5'>
            <Text className='font-semibold text-accent-green text-center pb-2'>{title}</Text>
            <Text className='text-2xl text-accent-green text-center'>{rating.toFixed(2)}</Text>
            <View className='flex flex-row justify-around gap-x-1'>{buildRating(rating)}</View>
        </View>
    );
};

export default RatingElement;
