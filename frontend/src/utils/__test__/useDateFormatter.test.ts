import { formatTime, formatLongLocalized, formatFullMonthYear, timeRelativeToNow } from '../useDateFormatter';
import { describe, it, expect } from '@jest/globals'
import { DateTime } from 'luxon';

describe('dateUtils', () => {

    describe('formatTime', () => {
        it('should return empty string for null or undefined input', () => {
            expect(formatTime(null)).toBe('');
            expect(formatTime(undefined)).toBe('');
        });

        it('should format string date correctly', () => {
            expect(formatTime('2024-08-04T01:31:00')).toBe('1:31 AM');
        });

        it('should format Date object correctly', () => {
            expect(formatTime(new Date('2024-08-04T01:31:00'))).toBe('1:31 AM');
        });
    });

    describe('formatLongLocalized', () => {
        it('should return empty string for null or undefined input', () => {
            expect(formatLongLocalized(null)).toBe('');
            expect(formatLongLocalized(undefined)).toBe('');
        });

        it('should format string date correctly', () => {
            expect(formatLongLocalized('2024-08-04')).toBe('Sunday, August 4, 2024');
        });

        it('should format Date object correctly', () => {
            expect(formatLongLocalized(new Date('2024-08-04'))).toBe('Sunday, August 4, 2024');
        });
    });

    describe('formatFullMonthYear', () => {
        it('should return empty string for null or undefined input', () => {
            expect(formatFullMonthYear(null)).toBe('');
            expect(formatFullMonthYear(undefined)).toBe('');
        });

        it('should format string date correctly', () => {
            expect(formatFullMonthYear('2024-08-04')).toBe('August 2024');
        });

        it('should format Date object correctly', () => {
            expect(formatFullMonthYear(new Date('2024-08-04'))).toBe('August 2024');
        });
    });

    describe('timeRelativeToNow', () => {
        it('should return empty string for null or undefined input', () => {
            expect(timeRelativeToNow(null)).toBe('');
            expect(timeRelativeToNow(undefined)).toBe('');
        });

        it('should return the correct relative time for future times', () => {
            const now = DateTime.local();
            const futureTime = now.plus({ hours: 2 }).toFormat('HH:mm');
            expect(timeRelativeToNow(futureTime)).toBe('in 2 hours');
        });

        it('should return the correct relative time for past times', () => {
            const now = DateTime.local();
            const pastTime = now.minus({ hours: 2}).toFormat('HH:mm');
            expect(timeRelativeToNow(pastTime)).toBe('2 hours ago');
        });
    });
});
