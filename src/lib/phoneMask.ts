export function maskPhoneInput(value: string): string {
    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('0098')) {
        digits = digits.slice(0, 14);
        return digits.replace(/^(0098)(\d{3})(\d{3})(\d{4})?/, (m, p1, p2, p3, p4) =>
            [p1, p2, p3, p4].filter(Boolean).join(' ')
        );
    }
    if (digits.startsWith('0')) {
        digits = digits.slice(0, 11);
        return digits.replace(/^(0\d{3})(\d{3})(\d{4})?/, (m, p1, p2, p3) =>
            [p1, p2, p3].filter(Boolean).join(' ')
        );
    }
    if (digits.length > 10) digits = digits.slice(0, 10);
    return digits.replace(/^(\d{3})(\d{3})(\d{4})?/, (m, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join(' ')
    );
}
