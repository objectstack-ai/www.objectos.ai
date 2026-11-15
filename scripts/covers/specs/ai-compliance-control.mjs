// Controls checked against evidence (the green hero checklist): one control
// has no evidence, and the gap becomes a remediation task for an owner.
export const topic = 'app-building';
export const aria = 'A green control checklist with one open gap; the gap becomes a task assigned to a person.';

export default ({ C, tile, line, ring, arrow, box, person }) => {
  const W = C.white;
  return [
    tile(170, 150, 400, 360, {
      color: C.green, tint: C.greenTint,
      inner: [
        line('M222 230l16 16 30-30', W, 12), line('M302 232H510', W, 18),
        line('M222 330l16 16 30-30', W, 12), line('M302 332H480', W, 18),
        ring(244, 430, 22, W, 9), line('M302 432H500', W, 18, ' stroke-dasharray="2 30"'),
      ],
    }),
    arrow('M618 432C700 432 720 400 760 400'),
    box(796, 330, 230, 140, C.ink, 36), line('M832 382H984M832 424H940'),
    person(910, 160, { s: 0.65 }),
    arrow('M910 270V302'),
  ];
};
