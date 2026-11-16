// Change by conversation is a loop around the app's metadata (the indigo
// hero tile): request, plan, confirm, and back again; one field is new.
export const topic = 'app-building';
export const aria = 'Two curved arrows form a loop around a blue metadata tile in which one row is new and green.';

export default ({ C, line, arrow, tile, fill }) => {
  const W = C.white;
  return [
    arrow('M282 290C318 112 882 112 918 290'),
    arrow('M918 388C882 566 318 566 282 388'),
    tile(456, 218, 288, 236, {
      inner: [line('M506 278H694M506 394H654', W, 18), fill(498, 316, 170, 40, C.green, 20)],
    }),
  ];
};
