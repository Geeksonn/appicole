import { Beer } from '@/lib/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NoVoteIcon, VoteEmptyIcon, VoteFilledIcon } from './icons';
import RatingElement from './rating-element';

type Props = {
    avgRating: number;
    usrRating: number;
    beer: Beer;
};

const Ratings: React.FC<Props> = ({ avgRating, usrRating, beer }) => {
    const buildRating = (id: string, rating: number): React.ReactNode[] => {
        let jsx: React.ReactNode[] = [];

        if (rating > 0) {
            let ratingLeft = rating;
            for (let i = 0; i < 5; i++) {
                if (ratingLeft >= 0.5) {
                    jsx.push(<VoteFilledIcon key={`${id}_${i}`} />);
                } else {
                    jsx.push(<VoteEmptyIcon key={`${id}_${i}`} />);
                }

                ratingLeft--;
            }
        } else {
            for (let i = 0; i < 5; i++) {
                jsx.push(<NoVoteIcon key={`${id}_no_vote_${i}`} />);
            }
        }

        return jsx;
    };

    return (
        <View className='flex flex-row items-center mt-8 px-4 justify-between'>
            <RatingElement
                title='Moyenne générale'
                rating={avgRating.toFixed(2)}
                ratingIcons={buildRating('avg', avgRating)}
            />
            {usrRating >= 0 ? (
                <RatingElement
                    title='Ma note'
                    rating={usrRating.toFixed(2)}
                    ratingIcons={buildRating('usr', usrRating)}
                />
            ) : (
                <TouchableOpacity
                    className='px-3 py-2 bg-accent-orange rounded-lg'
                    onPress={() => console.log('TODO: rate beer')}>
                    <Text className='text-sm font-medium text-white text-center'>Noter la bière</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Ratings;
