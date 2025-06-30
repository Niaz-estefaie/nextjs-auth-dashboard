import {User} from '@/types';

const USER_STORAGE_KEY = 'user_data';

export const saveUserToStorage = (user: User): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        }
    } catch (error) {
        console.error('Error saving user to storage:', error);
    }
};

export const getUserFromStorage = (): User | null => {
    try {
        if (typeof window === 'undefined') {
            return null;
        }

        const userData = localStorage.getItem(USER_STORAGE_KEY);
        if (!userData) {
            return null;
        }

        const parsedUser = JSON.parse(userData);

        if (!parsedUser.name || !parsedUser.email || !parsedUser.login) {
            removeUserFromStorage();
            return null;
        }

        return parsedUser;
    } catch (error) {
        console.error('Error getting user from storage:', error);
        removeUserFromStorage();
        return null;
    }
};

export const removeUserFromStorage = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    } catch (error) {
        console.error('Error removing user from storage:', error);
    }
};
