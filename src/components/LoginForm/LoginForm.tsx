'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/useAuth';
import {validateLoginForm} from '@/lib/validation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './LoginForm.module.scss';
import {maskPhoneInput} from "@/lib/phoneMask";

const LoginForm: React.FC = () => {
    const [username, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [submitError, setSubmitError] = useState('');

    const {login, loading} = useAuth();
    const router = useRouter();

    const removeSpaces = (input: string): string => input.replace(/\s+/g, '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        const cleanedPhoneNumber = removeSpaces(username);
        setPhoneNumber(cleanedPhoneNumber);

        const validation = validateLoginForm(cleanedPhoneNumber, password);
        setErrors(validation.errors);

        if (!validation.isValid) {
            return;
        }

        const success = await login(cleanedPhoneNumber, password);

        if (success) {
            router.push('/dashboard');
        } else {
            setSubmitError('خطا در احراز هویت. لطفاً دوباره تلاش کنید.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>ورود به سیستم</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        id="username"
                        type="text"
                        label="شماره تلفن"
                        value={username}
                        onChange={(e) => {
                            const masked = maskPhoneInput(e.target.value);
                            setPhoneNumber(masked);
                        }}
                        error={errors.username}
                        placeholder="شماره تلفن خود را وارد کنید"
                    />

                    <Input
                        id="password"
                        type="password"
                        label="رمز عبور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        placeholder="رمز عبور خود را وارد کنید"
                    />

                    {submitError && (
                        <div className={styles.submitError}>{submitError}</div>
                    )}

                    <Button
                        type="submit"
                        loading={loading}
                        className={styles.submitButton}
                    >
                        ورود
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
