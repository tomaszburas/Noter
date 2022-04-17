import format from 'date-fns/format';

export const createDate = (date: string): string => {
    return `${format(new Date(date), 'd.MM.yyyy')} - ${format(
        new Date(date),
        'hh:mm'
    )}`;
};
