import { supabase } from '@/lib/queries';
import { clearUserData, loadUserData } from '@/lib/SupaLegend';
import { Session } from '@supabase/supabase-js';
import React, { useContext } from 'react';

type AuthContextType = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({ session: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = React.useState<Session | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            await loadUserData();
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                await loadUserData();
            }

            if (event === 'SIGNED_OUT') clearUserData();

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
