export const validateLoginForm = (username: string, password: string) => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
        errors.username = 'شماره تلفن الزامی است';
    } else if (username.length < 9) {
        errors.username = 'شماره تلفن باید حداقل ۹ کاراکتر باشد';
    }

    if (!password.trim()) {
        errors.password = 'رمز عبور الزامی است';
    } else if (password.length < 4) {
        errors.password = 'رمز عبور باید حداقل ۴ کاراکتر باشد';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
