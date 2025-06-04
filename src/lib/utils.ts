import { format } from "date-fns";

/**
 * Formats a given date into a specified string format or a default format if none is provided.
 *
 * @param {Date | string | number | null} date - The date to format. Can be a Date object,
 * a string or a number that the Date constructor can handle, or null.
 * @param {string} [newFormat='dd MMM yyyy'] - The format string to use for formatting the date,
 * using date-fns format tokens. Defaults to 'dd MMM yyyy' if not provided.
 *
 * @returns {string} A formatted date string. If no valid date is provided, returns an empty string.
 *
 * Example usage:
 * formatDate(new Date(2020, 3, 15)); // Returns '15 Apr 2020'
 * formatDate('2020-04-15', 'yyyy-MM-dd'); // Returns '2020-04-15'
 * formatDate(1586930800000); // Timestamp for 2020-04-15, returns '15 Apr 2020'
 * formatDate(null); // Returns ''
 */
export function formatDate(date?: Date | string | number | null, newFormat?: string): string {
    const fm = newFormat || "dd MMM yyyy";
    return date ? format(new Date(date), fm) : "";
}
