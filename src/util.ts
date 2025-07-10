/**
 * @file util.ts
 */

/**
 * Sleep for a given number of milliseconds.
 * @param ms
 * @returns
 */
export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
