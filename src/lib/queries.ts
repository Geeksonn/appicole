import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { Beer, Edition, Event, UserRating } from './types';

const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
);

export const getEditions = async (): Promise<Edition[]> => {
    const { data: editions, error } = await supabase
        .from('editions')
        .select('*')
        .order('number', { ascending: false });

    if (error) {
        console.error('Error while fetching editions', error);
        return [];
    }

    return editions;
};

export const getEvents = async (): Promise<Event[]> => {
    const { data: events, error } = await supabase
        .from('events')
        .select('*, editions!inner()')
        .eq('editions.active', true);

    if (error) {
        console.error('Error while fetching events', error);
        return [];
    }

    return events;
};

export const getBeers = async (): Promise<Beer[]> => {
    const { data: beers, error } = await supabase.from('beers').select('*').eq('displayonmenu', true);

    if (error) {
        console.error('Error while fetching beers', error);
        return [];
    }

    return beers;
};

export const getUserRatings = async (): Promise<UserRating[]> => {
    const { data: ratings, error } = await supabase.from('app_users_ratings').select('*');

    if (error) {
        console.error('Error while fetching ratings', error);
        return [];
    }

    return ratings;
};
