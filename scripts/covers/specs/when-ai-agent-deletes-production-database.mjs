// A blast radius is a permission, not a prompt: the grey prompt asks; the
// grant (the green hero tile) decides. The agent's drop is stopped short of
// the grant; what the grant allows reaches the database.
export const topic = 'ai-agents';
export const aria = 'An AI agent ignores a grey prompt bubble; its drop is stopped before a green grant, and only allowed calls reach the database.';

export default ({ C, agent, line, dot, stopBar, tile, ring, arrow, cylinder }) => {
  const W = C.white;
  return [
    // the instruction: advisory
    line('M196 120H330a30 30 0 0 1 30 30v40a30 30 0 0 1-30 30H250l-36 30 8-30h-26a30 30 0 0 1-30-30v-40a30 30 0 0 1 30-30z', C.grey),
    dot(228, 170, 8, C.grey), dot(263, 170, 8, C.grey), dot(298, 170, 8, C.grey),
    agent(250, 360, { s: 0.8, withFace: true }),
    line('M346 420H436', C.red, 7), stopBar(452, 420),
    // the grant: authority
    tile(490, 200, 260, 320, { color: C.green, tint: C.greenTint, deg: 2, inner: [ring(620, 310, 40, W, 14), line('M620 352V430M620 400H654M620 430H646', W, 14)] }),
    arrow('M790 360H836'),
    cylinder(940, 268, 170, 190, { bands: 1 }),
  ];
};
