'use client';

import React from 'react';
import {useAuth} from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    const {user, logout} = useAuth();

    const handleLogout = () => {
        logout();
    };

    const stats = [
        {label: 'پروژه‌های فعال', value: '12', color: '#3b82f6'},
        {label: 'وظایف تکمیل شده', value: '28', color: '#10b981'},
        {label: 'پیام‌های جدید', value: '5', color: '#f59e0b'},
        {label: 'امتیاز کلی', value: '94%', color: '#8b5cf6'},
    ];

    const recentActivities = [
        {action: 'ورود به سیستم', time: 'همین الان', icon: '�'},
        {action: 'تکمیل پروژه طراحی', time: '2 ساعت پیش', icon: '✅'},
        {action: 'ارسال گزارش ماهانه', time: 'دیروز', icon: '�'},
        {action: 'به‌روزرسانی پروفایل', time: '3 روز پیش', icon: '👤'},
    ];

    const quickActions = [
        {title: 'پروژه جدید', description: 'شروع یک پروژه جدید', icon: '🚀', color: '#b82f6'},
        {title: 'گزارش‌ها', description: 'مشاهده گزارش‌های عملکرد', icon: '📈', color: '10b981'},
        {title: 'تنظیمات', description: 'مدیریت تنظیمات حساب', icon: '⚙️', color: '#6b7280'}
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>داشبورد</h1>
                    <div className={styles.headerActions}>
                        <span className={styles.welcomeText}>
                          سلام {user?.name.first} عزیز! 👋
                       </span>
                        <Button onClick={handleLogout} variant="secondary" size="sm">
                            خروج
                        </Button>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.welcomeSection}>
                    <div className={styles.welcomeCard}>
                        <div className={styles.userInfo}>
                            {user?.picture && (
                                <img
                                    src={user.picture.large}
                                    alt="User Avatar"
                                    className={styles.avatar}
                                />
                            )}
                            <div className={styles.userDetails}>
                                <h2 className={styles.userName}>
                                    {user?.name.first} {user?.name.last}
                                </h2>
                                <p className={styles.userEmail}>{user?.email}</p>
                                <div className={styles.userMeta}>
                                    <span className={styles.username}>@{user?.login.username}</span>
                                    <span className={styles.status}>🟢 آنلاین</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.welcomeMessage}>
                            <h3>خوش آمدید به پنل مدیریت! �</h3>
                            <p>امروز روز خوبی برای شروع کارهای جدید است. آماده‌اید؟</p>
                        </div>
                    </div>
                </div>

                <div className={styles.statsSection}>
                    <h3 className={styles.sectionTitle}>آمار کلی</h3>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <div
                                    className={styles.statIcon}
                                    style={{backgroundColor: `${stat.color}20`, color: stat.color}}
                                >
                                    📊
                                </div>
                                <div className={styles.statContent}>
                                    <h4 className={styles.statValue}>{stat.value}</h4>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.actionsSection}>
                    <h3 className={styles.sectionTitle}>عملیات سریع</h3>
                    <div className={styles.actionsGrid}>
                        {quickActions.map((action, index) => (
                            <div key={index} className={styles.actionCard}>
                                <div
                                    className={styles.actionIcon}
                                    style={{backgroundColor: `${action.color}20`, color: action.color}}
                                >
                                    {action.icon}
                                </div>
                                <div className={styles.actionContent}>
                                    <h4 className={styles.actionTitle}>{action.title}</h4>
                                    <p className={styles.actionDescription}>{action.description}</p>
                                </div>
                                <button className={styles.actionButton}>
                                    →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.activitiesSection}>
                    <h3 className={styles.sectionTitle}>فعالیت‌های اخیر</h3>
                    <div className={styles.activitiesCard}>
                        {recentActivities.map((activity, index) => (
                            <div key={index} className={styles.activityItem}>
                                <div className={styles.activityIcon}>{activity.icon}</div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityAction}>{activity.action}</p>
                                    <span className={styles.activityTime}>{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
