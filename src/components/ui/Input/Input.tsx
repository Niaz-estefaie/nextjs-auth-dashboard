import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         error,
                                         className = '',
                                         ...props
                                     }) => {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            {label && (
                <label className={styles.label} htmlFor={props.id}>
                    {label}
                </label>
            )}
            <input
                className={`${styles.input} ${error ? styles.error : ''}`}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
