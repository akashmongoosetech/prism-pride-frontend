/**
 * Utility functions for calculating estimated reading time.
 * Standard adult reading speed is approximately 200-220 words per minute.
 */

export interface ReadingTimeResult {
  /** Estimated reading time in minutes (minimum 1) */
  minutes: number;
  /** Human-readable string e.g. "4 min read" */
  text: string;
  /** Total calculated word count */
  words: number;
}

/**
 * Calculates estimated reading time from a content string.
 * Strips HTML tags and markdown symbols before splitting by whitespace.
 * 
 * @param content The text or markdown content to calculate reading time for.
 * @param wordsPerMinute Average words read per minute (defaults to 200).
 * @returns ReadingTimeResult with minutes, text, and word count.
 */
export function calculateReadingTime(
  content: string | undefined | null,
  wordsPerMinute: number = 200
): ReadingTimeResult {
  if (!content || typeof content !== 'string') {
    return {
      minutes: 1,
      text: '1 min read',
      words: 0
    };
  }

  // Strip HTML tags and markdown syntax
  const plainText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/#+\s/g, ' ')
    .replace(/[*_~`[\]()]/g, ' ')
    .trim();

  const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    minutes,
    text: `${minutes} min read`,
    words
  };
}

/**
 * Gets a clean, formatted reading time string (e.g. '5 min read').
 * If content is provided, calculates dynamically; otherwise falls back to existingReadTime.
 * 
 * @param content The content string
 * @param existingReadTime Optional fallback string
 * @returns e.g. "5 min read"
 */
export function getEstimatedReadingTime(
  content?: string | null,
  existingReadTime?: string | null
): string {
  if (content && content.trim().length > 0) {
    return calculateReadingTime(content).text;
  }
  if (existingReadTime && existingReadTime.trim().length > 0) {
    // If existing has format like "5" or "5 min", normalize to "5 min read"
    const cleaned = existingReadTime.trim();
    if (/^\d+$/.test(cleaned)) {
      return `${cleaned} min read`;
    }
    if (!cleaned.includes('read')) {
      return `${cleaned} read`;
    }
    return cleaned;
  }
  return '1 min read';
}
