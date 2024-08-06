import { isDate, isNil } from 'lodash';
import { DateTime } from 'luxon';

export function formatTime(date: string | Date | null | undefined): string {
    if (isNil(date)) {
        return '';
    }

    let dateTime = DateTime.fromISO(date as string);

    if (isDate(date)) {
        dateTime = DateTime.fromJSDate(date);
    }

    // Format: 1:31 AM
    return dateTime.setLocale('en-US').toFormat('t');
}

export function formatLongLocalized(date: string | Date | null | undefined): string {
    if (isNil(date)) {
        return '';
    }

    let dateTime = DateTime.fromISO(date as string);

    if (isDate(date)) {
        dateTime = DateTime.fromJSDate(date);
    }

    // format: Sunday, August 4, 2024
    return dateTime.setLocale('en-US').toLocaleString({
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatFullMonthYear(date: string | Date | null | undefined): string {
    if (isNil(date)) {
        return '';
    }

    let dateTime = DateTime.fromISO(date as string);

    if (isDate(date)) {
        dateTime = DateTime.fromJSDate(date);
    }

    // August 2024
    return dateTime.setLocale('en-US').toLocaleString({
        month: 'long',
        year: 'numeric',
    });
}

export function timeRelativeToNow(time: string | null | undefined): string {
    if (isNil(time)) {
        return '';
    }

    const [hour, minute] = time.split(':').map(Number);
    const now = DateTime.local();
    const targetTime = now.set({ hour, minute, second: 0, millisecond: 0 });

    const diffInHours = targetTime.diff(now, 'hours').hours;

    if (diffInHours > 0) {
        return `in ${Math.round(diffInHours)} hours`;
    } else {
        return `${Math.abs(Math.round(diffInHours))} hours ago`;
    }
}