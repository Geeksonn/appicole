import { UserRating } from '@/lib/types';
import React from 'react';
import { View } from 'react-native';
import RatingElement from './rating-element';
import UserRatingElement from './user-rating-element';

type Props = {
    avgRating: number;
    justVoted: boolean;
    beerId: string;
    userId: string;
    fullUserRatings: UserRating[];
    showRateBeer: () => void;
};

const Ratings: React.FC<Props> = (props) => {
    const { avgRating, justVoted, beerId, userId, fullUserRatings, showRateBeer } = props;
    const usrRating = fullUserRatings.find((r) => r.user === userId && r.beer === beerId)?.rating ?? -1;

    return (
        <View className='flex flex-row items-center mt-8 px-4 justify-between'>
            <RatingElement title='Moyenne générale' rating={avgRating} />
            {userId !== '' ? (
                <UserRatingElement justVoted={justVoted} usrRating={usrRating} showRateBeer={showRateBeer} />
            ) : null}
        </View>
    );
};

export default Ratings;
