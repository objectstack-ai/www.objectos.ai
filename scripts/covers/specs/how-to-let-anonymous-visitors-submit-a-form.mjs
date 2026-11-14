// A wall with one door (the indigo hero) and three slots: three fields pass
// through into a record; one field is refused at the wall.
export const topic = 'app-building';
export const aria = 'A blue door in a wall lets three green fields through its slots into a record; one red field is stopped at the wall.';

export default ({ C, wall, door, fill, line, arrow, box, stopBar }) => {
  const SL = [230, 320, 410];
  return [
    wall(568, 100, 475),
    door(448, 140, 280, 360, SL),
    ...SL.map((y) => fill(224, y - 30, 60, 60, C.green, 20)),
    ...SL.map((y) => line(`M304 ${y}H428`)),
    ...SL.map((y) => arrow(`M748 ${y}H844`)),
    box(876, 166, 178, 308, C.ink, 44),
    ...SL.map((y) => fill(935, y - 30, 60, 60, C.green, 20)),
    // the blocked field is an outline: a filled red would be a seventh fill colour
    box(232, 524, 44, 44, C.red, 14),
    line('M298 546H514', C.red, 7),
    stopBar(530, 546),
  ];
};
