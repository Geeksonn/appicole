import { Tables } from './database.types';

export type Event = Tables<'events'>;
export type Beer = Tables<'beers'>;
export type Edition = Tables<'editions'>;
export type UserRating = Tables<'app_users_ratings'>;
export type Badge = Tables<'badges'>;

export type UserProfile = {
    id: string;
    email: string;
    unseenBadge: boolean;
    badges: Badge[];
    ratings: UserRating[];
};

export type RouteWithBeers = {
    id: string;
    name: string;
    beers: { id: string; order: number }[];
};
