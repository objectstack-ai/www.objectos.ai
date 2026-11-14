// An employee picks a service from the catalog (the indigo hero tile): a
// laptop, a badge, a day off.
export const topic = 'app-building';
export const aria = 'A person asks, and an arrow picks one of three services from a blue service catalog.';

export default ({ C, person, arrow, tile, fill, line, ring, box }) => {
  const W = C.white;
  return [
    person(250, 290, { s: 0.9, withFace: true }),
    arrow('M346 330C390 330 410 340 436 340'),
    tile(470, 190, 540, 300, {
      deg: -2,
      inner: [
        fill(510, 270, 140, 140, W, 32), box(538, 304, 84, 56, C.brand, 10), line('M528 380H632', C.brand, 9),
        fill(670, 270, 140, 140, W, 32), box(712, 294, 56, 86, C.brand, 14), ring(740, 328, 12, C.brand, 8),
        fill(830, 270, 140, 140, W, 32), box(856, 304, 88, 76, C.brand, 14), line('M876 288V314M924 288V314', C.brand, 9),
      ],
    }),
  ];
};
