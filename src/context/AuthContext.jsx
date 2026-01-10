import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function handles fetching the user profile and setting the final state.
    const processSession = async (session) => {
      try {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', session.user.id)
            .single();
          setUser({ ...session.user, ...profile });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error processing session:", error);
        setUser(null);
      } finally {
        // Always stop loading, even if there's an error.
        setLoading(false);
      }
    };

    // onAuthStateChange is the single source of truth for the user's session.
    // It fires on initial load and on every auth event.
    // We removed the redundant getSession() call to prevent race conditions.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // The callback itself is synchronous, but it calls an async function.
        // This avoids the deadlocks warned about in the Supabase docs when awaiting
        // other Supabase calls inside the onAuthStateChange callback.
        processSession(session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const register = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
