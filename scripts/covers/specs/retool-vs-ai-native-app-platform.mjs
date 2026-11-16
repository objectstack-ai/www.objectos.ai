// RBAC guards the door (the indigo hero door, a slot that passes); the
// logic behind it is loose in the room: scattered fragments, nothing holds
// them together.
export const topic = 'app-building';
export const aria = 'A person reaches a guarded blue door in a wall; behind it, small grey fragments lie scattered across the room.';

export default ({ C, person, wall, door, box, line, arrow }) => {
  const frag = (x, y, deg) => `<g transform="rotate(${deg} ${x + 60} ${y + 34})">${box(x, y, 120, 68, C.grey, 22)}${line(`M${x + 28} ${y + 34}H${x + 92}`, C.grey, 9)}</g>`;
  return [
    person(220, 250, { s: 0.8, withFace: true }),
    arrow('M318 340H350'),
    wall(500, 100, 475),
    door(390, 190, 260, 300, [340], { slotW: 160 }),
    frag(720, 150, -8), frag(890, 196, 6), frag(700, 316, 5), frag(880, 380, -6), frag(760, 470, 3),
  ];
};
