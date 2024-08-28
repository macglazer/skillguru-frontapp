type DateTimeFormat = 'DD MMMM YYYY' | 'DD.MM.YYYY';

const DATE_FORMAT_DEFAULT = 'DD MMMM YYYY';

export const formatDate = (
  dateString: string | number | Date,
  format: DateTimeFormat = DATE_FORMAT_DEFAULT,
): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  try {
    switch (format) {
      case 'DD MMMM YYYY': {
        const formatDateOptions: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        };
        return date.toLocaleString('en-US', formatDateOptions);
      }
      case 'DD.MM.YYYY': {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
      default:
        return '';
    }
  } catch (error) {
    console.error(error)
  }

  return '';
};

interface DateObject {
    [key: string]: any;
}

export function getSortFunction(order: 'asc' | 'desc', key: string): (a: DateObject, b: DateObject) => number {
    return (a: DateObject, b: DateObject) => {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);

        if (order === 'asc') {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    }; 
}
