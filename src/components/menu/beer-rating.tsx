import React from 'react';
import { Text, View } from 'react-native';
import { RatingEmptyIcon, RatingFilledIcon } from './icons';

type Props = {
    rating: number;
    numberOfVotes?: number;
};

const BeerRating: React.FC<Props> = ({ rating, numberOfVotes = -1 }) => {
    const buildRating = (): React.ReactElement[] => {
        let jsx: React.ReactElement[] = [];

        let ratingLeft = rating;
        for (let i = 0; i < 5; i++) {
            if (ratingLeft > 0) {
                jsx.push(<RatingFilledIcon key={`vote_${i}`} />);
            } else {
                jsx.push(<RatingEmptyIcon key={`vote_${i}`} />);
            }
            ratingLeft--;
        }

        jsx.push(
            <Text key={`rating`} className='pl-0.5 text-sm text-brass-green'>
                {rating.toFixed(2)}
            </Text>,
        );
        if (numberOfVotes > -1)
            jsx.push(<Text key={`voters`} className='text-sm text-brass-grey'>{`(${numberOfVotes})`}</Text>);

        return jsx;
    };

    return <View className='flex flex-row items-center gap-x-1'>{buildRating()}</View>;
};

export default BeerRating;
