import { observable } from '@legendapp/state';
import { syncedCrud } from '@legendapp/state/sync-plugins/crud';
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

export const userRatings$ = observable(
    syncedCrud({
        list: queries.getUserRatings,
        mode: 'assign',
    }),
);

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
