// A person reads a one-page sign-off sheet (the indigo hero tile) of four
// lines; an AI agent's change arrives on the one line that is not yet ticked.
export const topic = 'governance';
export const aria = 'A person reads a four-line sign-off sheet; an AI agent changes one line, the only one not yet ticked.';

export default ({ C, person, agent, box, line, arrow, tile, DOTTED }) => {
  const W = C.white;
  const rows = [196, 284, 372, 460];
  const inner = rows.flatMap((y, i) => [
    box(488, y - 22, 44, 44, W, 12, { w: 8 }),
    ...(i === 1 ? [] : [line(`M499 ${y}l9 10 16 -19`, W, 8)]),
    line(`M570 ${y}H${i === 1 ? 706 : 718}`, W, 16),
  ]);
  return [
    person(262, 280, { s: 0.98, withFace: true }),
    line('M352 330C378 330 398 324 422 316', C.ink, 15, DOTTED),
    tile(446, 120, 308, 420, { color: C.brand, tint: C.brandTint, deg: -2, inner }),
    agent(944, 284, { s: 0.94 }),
    arrow('M872 300C842 300 826 290 812 282'),
  ];
};
