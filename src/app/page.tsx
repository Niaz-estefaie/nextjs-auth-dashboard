'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/auth');
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div>در حال انتقال...</div>
        </div>
    );
}
