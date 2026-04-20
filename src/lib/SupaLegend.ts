import { observable } from '@legendapp/state';
import { syncedCrud } from '@legendapp/state/sync-plugins/crud';
import uuid from 'react-native-uuid';
import * as queries from './queries';
import { UserProfile } from './types';

export const editions$ = observable(
    syncedCrud({
        list: queries.getEditions,
        mode: 'assign',
    }),
);

export const events$ = observable(
    syncedCrud({
        list: queries.getEvents,
        mode: 'assign',
    }),
);

export const beers$ = observable(
    syncedCrud({
        list: queries.getBeers,
        mode: 'assign',
    }),
);

export const routes$ = observable(
    syncedCrud({
        list: queries.getRoutesWithBeers,
        mode: 'assign',
    }),
);

export const questionsAndOptions$ = observable(
    syncedCrud({
        list: queries.getQuestionsAndOptions,
        mode: 'assign',
    }),
);

export const badges$ = observable(
    syncedCrud({
        list: queries.getBadges,
        mode: 'assign',
    }),
);

export const addUserBadge = async (badge: string, userId: string) => {
    const newUserBadge = {
        id: uuid.v4() as string,
        badge,
        user: userId
    };

    const addedBadge = await queries.addBadgeToUser(newUserBadge);

    if (addedBadge) {
        currentUser$.profile.badges.push(addedBadge);
    }
};

export const userRatings$ = observable(
    syncedCrud({
        list: queries.getUserRatings,
        create: queries.createUserRating,
        mode: 'assign',
    }),
);

export const addUserRating = (beerId: string, rating: number, userId: string) => {
    const id = uuid.v4() as string;
    userRatings$[id].set({
        id,
        beer: beerId,
        user: userId,
        rating: rating,
        created_at: new Date().toISOString(),
    });
    currentUser$.profile.ratings.push({
        id,
        beer: beerId,
        rating: rating,
        user: userId,
        created_at: new Date().toISOString(),
    });
};

export const currentUser$ = observable({
    profile: null as UserProfile | null,
    loading: false,
});

export const loadUserData = async () => {
    currentUser$.loading.set(true);

    const userData = await queries.getUserData();
    if (userData) {
        currentUser$.profile.set(userData);
        currentUser$.loading.set(false);
    }
};

export const clearUserData = () => {
    currentUser$.profile.set(null);
};
