/**
 * Generates a URL-friendly slug from a string.
 * @param text Input string (e.g., product name)
 * @returns Lowercase, hyphenated string
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars except -
        .replace(/--+/g, '-')           // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Simple function to introduce a delay (useful for testing loading states, etc.)
 * @param ms Milliseconds to wait
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add other general helper functions here as needed
