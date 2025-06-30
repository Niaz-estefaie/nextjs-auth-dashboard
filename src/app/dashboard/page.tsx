'use client';

import React, {Suspense, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/useAuth';
import Dashboard from "@/components/Dashboard";

const DashboardPageContent: React.FC = () => {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    در حال بارگذاری...
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <Dashboard/>;
};

const DashboardPage: React.FC = () => {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                در حال بارگذاری...
            </div>
        }>
            <DashboardPageContent/>
        </Suspense>
    );
};

export default DashboardPage;
