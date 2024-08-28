interface FormatPriceOptions {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
}

export function formatPrice(amountInCents: number, options: FormatPriceOptions = {}): string {
    const {
        currency = 'PLN',
        locale = 'pl-PL',
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
        useGrouping = true
    } = options;

    const amountInUnits = amountInCents / 100;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping
    }).format(amountInUnits);
}

// Examples
// console.log(formatPrice(123456, { minimumFractionDigits: 0, maximumFractionDigits: 0 })); // "1 235 zł"
// console.log(formatPrice(123456, { minimumFractionDigits: 0, maximumFractionDigits: 2 })); // "1 234,56 zł"
// console.log(formatPrice(123456, { minimumFractionDigits: 2, maximumFractionDigits: 2 })); // "1 234,56 zł"
// console.log(formatPrice(123456, { minimumFractionDigits: 2, maximumFractionDigits: 4 })); // "1 234,5600 zł"
