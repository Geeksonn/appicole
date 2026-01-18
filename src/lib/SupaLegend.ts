import { observable } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!
);

export const events$ = observable(
    syncedSupabase({
        supabase,
        collection: 'events',
        actions: ['read'],
        persist: {
            name: 'events',
            plugin: observablePersistAsyncStorage({
                AsyncStorage,
            }),
        },
        fieldCreatedAt: 'created_at',
        fieldUpdatedAt: 'updated_at',
        fieldDeleted: 'deleted',
        changesSince: 'last-sync',
    })
);
