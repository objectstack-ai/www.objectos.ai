// The agent's change passes four gates on its way to the users' app (the
// green hero tile); a mistake is stopped at the first gate it fails.
export const topic = 'ai-agents';
export const aria = 'An AI agent’s change passes through four gates into a green app; a mistake is stopped at the first gate.';

export default ({ C, agent, line, arrow, stopBar, tile }) => {
  const gates = [430, 500, 570, 640];
  return [
    agent(228, 300, { s: 0.8, withFace: true }),
    line(gates.map((x) => `M${x} 180V274M${x} 330V420`).join(''), C.ink, 14),
    arrow('M318 302H690'),
    line('M318 378H376', C.red, 7), stopBar(390, 378),
    tile(738, 170, 300, 300, { color: C.green, tint: C.greenTint, deg: 2, inner: line('M786 250H990M786 320H950M786 390H970', C.white, 18) }),
  ];
};
