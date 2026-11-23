// Where the definition lives: the definition file in the repository is the
// hero (the indigo tile), one added line in green; an arrow builds the running
// system's database from it. The file is the authoritative copy.
export const topic = 'governance';
export const aria = 'A blue definition file with one added green line builds the running system, drawn as a database.';

export default ({ C, line, arrow, tile, fill, cylinder }) => {
  const W = C.white;
  return [
    tile(184, 128, 350, 412, {
      deg: -2,
      inner: [
        line('M240 208H452', W, 16),
        line('M240 270H412', W, 16),
        line('M240 332H436', W, 16),
        // the one added line
        fill(222, 372, 268, 56, C.green, 28),
        line('M258 400h28M272 386v28', W, 9),
        line('M314 400H462', W, 12),
        line('M240 470H400', W, 16),
      ],
    }),
    arrow('M584 334H706'),
    cylinder(886, 214, 280, 286, { bands: 2 }),
  ];
};
