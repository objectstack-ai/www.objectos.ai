// A seller's spoken update moves the opportunity (the indigo hero tile) one
// stage along and leaves a next-step task.
export const topic = 'app-building';
export const aria = 'A person updates a blue opportunity, which moves one stage along its track and creates a checked next-step task.';

export default ({ C, person, arrow, tile, dot, ring, line, box }) => {
  const W = C.white;
  return [
    person(250, 170, { s: 0.85 }),
    arrow('M338 236C380 236 404 270 418 300'),
    tile(450, 222, 360, 240, {
      deg: -2,
      inner: [line('M532 340H608M652 340H692', W, 9), dot(510, 340, 22, W), dot(630, 340, 22, W), ring(730, 340, 20, W, 9)],
    }),
    arrow('M858 358C906 358 920 392 920 420'),
    box(830, 456, 200, 104, C.ink, 32), box(860, 482, 52, 52, C.green, 14), line('M872 508l12 12 22-22', C.green, 9), line('M934 508H996'),
  ];
};
