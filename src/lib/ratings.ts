import { UserRating } from './types';

export const getRatingAndVotes = (
    bid: string,
    userRatings: UserRating[],
): { rating: number; nbVotes: number } => {
    const ratingsForBeer = userRatings.filter((ur) => ur.beer === bid);
    const nbVotes = ratingsForBeer.length;
    if (nbVotes === 0) {
        return { rating: 0, nbVotes: 0 };
    }
    const totalRating = ratingsForBeer.reduce((sum, ur) => sum + ur.rating, 0);
    const averageRating = totalRating / nbVotes;
    return { rating: averageRating, nbVotes };
};
