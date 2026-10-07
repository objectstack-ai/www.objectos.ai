/**
 * Card grids without a lone last card.
 *
 * A fixed three-column grid ends on a short row whenever its card count is not
 * a multiple of three: four cards left one card with two-thirds of its row
 * empty (FDE "4. Govern and leave", platform "The review loop"), five left a
 * third, and the glossary index's 22 terms left "Vibe coding" alone. The row
 * sizes below never leave a row shorter than two: 4 is 2 + 2, 5 is 3 + 2, 7 is
 * 3 + 2 + 2, 22 is six rows of three and two of two.
 *
 * Grids that use this lay out on six tracks, so a card spans 2 tracks in a row
 * of three, 3 in a row of two and 6 when it is alone (a count of one). Narrower
 * breakpoints keep their own column counts and ignore the spans.
 */
export function rowSizes(count: number): number[] {
  if (count <= 0) return [];
  if (count <= 3) return [count];
  if (count === 4) return [2, 2];
  const threes = Math.floor(count / 3);
  const rest = count % 3;
  if (rest === 0) return Array(threes).fill(3);
  if (rest === 2) return [...Array(threes).fill(3), 2];
  return [...Array(threes - 1).fill(3), 2, 2];
}

/** The six-track span of each of `count` cards, in order: 2, 3 or 6. */
export function cardSpans(count: number): number[] {
  return rowSizes(count).flatMap((size) => Array(size).fill(6 / size));
}
