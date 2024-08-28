export function generatePagination(current: number, last: number): (number | null)[] {
    const maxVisiblePages: number = 7;
    const pages: (number | null)[] = [];

    if (last <= maxVisiblePages) {
        for (let i = 1; i <= last; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push(null);
            pages.push(last);
        } else if (current >= last - 2) {
            pages.push(1);
            pages.push(null);
            for (let i = last - 4; i <= last; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push(null);
            for (let i = current - 1; i <= current + 1; i++) {
                pages.push(i);
            }
            pages.push(null);
            pages.push(last);
        }
    }

    return pages;
}
