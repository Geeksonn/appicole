import { UserRating } from './types';

type Result = {
    rating: number;
    nbVotes: number;
};

export const getRatingAndVotes = (bid: string, userRatings: UserRating[]): Result => {
    const ratingsForBeer = userRatings.filter((ur) => ur.beer === bid);
    const nbVotes = ratingsForBeer.length;
    if (nbVotes === 0) {
        return { rating: 0, nbVotes: 0 };
    }
    const totalRating = ratingsForBeer.reduce((sum, ur) => sum + ur.rating, 0);
    const averageRating = totalRating / nbVotes;
    return { rating: averageRating, nbVotes };
};
