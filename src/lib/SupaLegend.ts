import { observable } from '@legendapp/state';
import { syncedCrud } from '@legendapp/state/sync-plugins/crud';
import { getBeers, getEditions, getEvents, getUserData, getUserRatings } from './queries';
import { UserProfile } from './types';

export const editions$ = observable(
    syncedCrud({
        list: getEditions,
        mode: 'assign',
    }),
);

export const events$ = observable(
    syncedCrud({
        list: getEvents,
        mode: 'assign',
    }),
);

export const beers$ = observable(
    syncedCrud({
        list: getBeers,
        mode: 'assign',
    }),
);

export const userRatings$ = observable(
    syncedCrud({
        list: getUserRatings,
        mode: 'assign',
    }),
);

export const currentUser$ = observable({
    profile: null as UserProfile | null,
    loading: false,
});

export const loadUserData = async () => {
    currentUser$.loading.set(true);

    const userData = await getUserData();
    if (userData) {
        currentUser$.profile.set(userData);
        currentUser$.loading.set(false);
    }
};

export const clearUserData = () => {
    currentUser$.profile.set(null);
};
