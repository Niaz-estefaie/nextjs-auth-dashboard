import {ApiResponse, CacheItem, User} from '@/types';

const API_BASE_URL = 'https://randomuser.me/api/';

const cache = new Map<string, CacheItem<User>>();
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchRandomUser = async (): Promise<User> => {
    const cacheKey = 'randomUser';
    const now = Date.now();

    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!;
        if (now - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}?results=1&nat=us`, {
            headers: {
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('No user data received');
        }

        const user: User = data.results[0];

        cache.set(cacheKey, {data: user, timestamp: now});

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('خطا در دریافت اطلاعات کاربر');
    }
};

export const clearOldCache = (): void => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            cache.delete(key);
        }
    }
};
