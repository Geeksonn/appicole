import { Tables } from './database.types';

export type Event = Tables<'events'>;
export type Beer = Tables<'beers'>;
export type Edition = Tables<'editions'>;
export type UserRating = Tables<'app_users_ratings'>;
