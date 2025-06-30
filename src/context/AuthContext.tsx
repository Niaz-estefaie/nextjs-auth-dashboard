'use client';

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {AuthContextType, User} from '@/types';
import {getUserFromStorage, removeUserFromStorage, saveUserToStorage} from '@/lib/storage';
import {fetchRandomUser} from '@/lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        if (!mounted) return;

        try {
            const savedUser = getUserFromStorage();
            if (savedUser) {
                setUser(savedUser);
            }
        } catch (error) {
            console.error('Error loading user from storage:', error);
        } finally {
            setLoading(false);
        }
    }, [mounted]);

    const login = useCallback(async (phone: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);

            const cleanPhone = phone.replace(/[\s-]/g, '');

            if (!validateIranianPhone(cleanPhone)) {
                console.error('شماره تلفن معتبر نیست');
                return false;
            }

            if (!validatePassword(password)) {
                console.error('رمز عبور معتبر نیست');
                return false;
            }

            const userData = await fetchRandomUser();

            const userWithPhone = {
                ...userData,
                phone: cleanPhone
            };

            setUser(userWithPhone);
            saveUserToStorage(userWithPhone);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        removeUserFromStorage();
        router.push('/auth');
    }, [router]);

    const contextValue = React.useMemo(() => ({
        user,
        login,
        logout,
        loading,
        isAuthenticated
    }), [user, login, logout, loading, isAuthenticated]);

    if (!mounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const validateIranianPhone = (phone: string): boolean => {
    const patterns = [
        /^09\d{9}$/,
        /^\+989\d{9}$/,
        /^00989\d{9}$/,
        /^989\d{9}$/,
    ];
    return patterns.some(pattern => pattern.test(phone));
};

const validatePassword = (password: string): boolean => {
    return (
        password.length >= 8 &&
        /\d/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
