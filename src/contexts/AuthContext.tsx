
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isPremium: boolean;
  premiumUntil: string | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumUntil, setPremiumUntil] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      if (!user) {
        setIsPremium(false);
        setPremiumUntil(null);
        return;
      }
      
      console.log('Checking subscription for user:', user.id);
      
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        // Don't throw error, just log it and continue with default values
        setIsPremium(false);
        setPremiumUntil(null);
        return;
      }
      
      console.log('Subscription check result:', data);
      setIsPremium(data?.isPremium || false);
      setPremiumUntil(data?.premiumUntil || null);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsPremium(false);
      setPremiumUntil(null);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso!",
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setIsPremium(false);
      setPremiumUntil(null);
      
      toast({
        title: "Logout realizado com sucesso!",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Erro ao fazer logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email de recuperação enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Erro ao enviar email de recuperação",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          // Small delay to ensure user is properly set
          setTimeout(() => {
            checkSubscription();
          }, 1000);
        } else {
          setIsPremium(false);
          setPremiumUntil(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Check subscription when user changes
  useEffect(() => {
    if (user && !loading) {
      checkSubscription();
    }
  }, [user, loading]);

  const value = {
    user,
    isPremium,
    premiumUntil,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    checkSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
