// The model is only the top: an agent reaches production on four layers
// beneath it (the indigo hero bars: semantics, permissions, flow and
// approval, audit).
export const topic = 'ai-agents';
export const aria = 'An AI agent stands on four stacked blue layers, and from there reaches a production box with a green check.';

export default ({ C, agent, fill, line, arrow, box }) => {
  const W = C.white;
  const ys = [254, 332, 410, 488];
  return [
    agent(440, 150, { s: 0.6, withFace: true }),
    ...ys.map((y) => fill(252, y + 12, 420, 58, C.brandTint, 29) + fill(230, y, 420, 58, C.brand, 29) + line(`M272 ${y + 29}H${[400, 360, 380, 340][ys.indexOf(y)]}`, W, 14)),
    arrow('M716 400H806'),
    box(844, 320, 170, 160, C.ink, 40), line('M892 402l22 22 42-44', C.green, 11),
  ];
};
