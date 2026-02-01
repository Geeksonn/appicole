import { observable } from '@legendapp/state';
import { syncedCrud } from '@legendapp/state/sync-plugins/crud';
import { getBeers, getEditions, getEvents, getUserRatings } from './queries';

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
