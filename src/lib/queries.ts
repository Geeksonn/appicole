import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database, TablesInsert } from './database.types';
import {
    Beer,
    Edition,
    Event,
    OptionsForQuestion,
    QuestionsAndOptions,
    RouteWithBeers,
    UserRating,
} from './types';

export const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    },
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

export const getQuestionsAndOptions = async (): Promise<QuestionsAndOptions[]> => {
    const { data: questions, error: errQ } = await supabase
        .from('questions')
        .select('*, editions!inner()')
        .eq('editions.active', true);

    if (errQ) {
        console.error('Error while fetching questions', errQ);
        return [];
    }

    const { data: options, error: errO } = await supabase
        .from('options')
        .select('*')
        .in(
            'question',
            questions.map((q) => q.id),
        );

    if (errO) {
        console.error('Error while fetching options', errO);
        return [];
    }

    return questions
        .map((q) => {
            const optionsForQ: OptionsForQuestion[] = options
                .filter((o) => o.question === q.id)
                .map((o) => {
                    return {
                        id: o.id,
                        option: o.option,
                        selectedBeerId: o.selected_beer_id,
                        nextQuestionId: o.next_question,
                    };
                });

            return {
                id: q.id,
                qid: q.qid,
                question: q.question,
                options: optionsForQ,
            };
        })
        .sort((a, b) => a.qid - b.qid);
};

export const getRoutesWithBeers = async (): Promise<RouteWithBeers[]> => {
    const { data: routes, error } = await supabase
        .from('routes')
        .select('*, editions!inner()')
        .eq('editions.active', true);

    if (error) {
        console.error('Error while fetching routes', error);
        return [];
    }

    const { data: routeBeers, error: errRouteBeers } = await supabase
        .from('route_beers')
        .select('*')
        .in(
            'route',
            routes.map((r) => r.id),
        );

    if (errRouteBeers) {
        console.error('Error while fetching route beers', errRouteBeers);
        return [];
    }

    return routes.map((route) => ({
        id: route.id,
        name: route.name,
        beers: routeBeers
            .filter((rb) => rb.route === route.id)
            .map((rb) => {
                return {
                    id: rb.beer,
                    order: rb.order,
                };
            }),
    }));
};

export const getUserRatings = async (): Promise<UserRating[]> => {
    const { data: ratings, error } = await supabase
        .from('app_users_ratings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error while fetching ratings', error);
        return [];
    }

    return ratings;
};

export const createUserRating = async (uRating: UserRating) => {
    const { data, error } = await supabase.from('app_users_ratings').insert(uRating).select().single();

    if (error) {
        console.error('Error while creating user rating', error);
        return null;
    }

    return data;
};

export const getUserData = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: userData, error } = await supabase
        .from('app_users')
        .select('id, email, unseenBadge')
        .eq('email', user.email!)
        .single();

    if (error) {
        console.error('Error while loading user data', error);
        return null;
    }

    const [userBadgeRes, badgesRes, ratingsRes] = await Promise.all([
        await supabase.from('app_users_badges').select('*').eq('user', userData.id),
        await supabase.from('badges').select('*'),
        await supabase.from('app_users_ratings').select('*').eq('user', userData.id),
    ]);

    if (userBadgeRes.error) {
        console.error('Error while loading user badges', userBadgeRes.error);
        return null;
    }

    if (badgesRes.error) {
        console.error('Error while loading badges', badgesRes.error);
        return null;
    }

    if (ratingsRes.error) {
        console.error('Error while loading badges', ratingsRes.error);
        return null;
    }

    const userBadgesIds = userBadgeRes.data.map((ub) => ub.badge);
    const filteredBadges = badgesRes.data.filter((b) => userBadgesIds.includes(b.id));

    return {
        ...userData,
        badges: filteredBadges,
        ratings: ratingsRes.data,
    };
};

export const createUser = async (email: string) => {
    const newUser: TablesInsert<'app_users'> = {
        email,
        unseenBadge: false,
    };
    const { data, error } = await supabase.from('app_users').insert(newUser);

    if (error) {
        console.error('Error while creating user', error);
        return null;
    }
};
