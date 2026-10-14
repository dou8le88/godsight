/**
 * Creates an array of numbers from `start` to `end` (inclusive).
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
