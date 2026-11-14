// Per-action billing grows with every action the agent takes (rising grey
// bars); a self-hosted runtime (the green hero tile) costs the same at any
// volume (level bars).
export const topic = 'governance';
export const aria = 'Rising bars in an outlined box beside level white bars on a green tile.';

export default ({ C, box, bars, tile }) => {
  const W = C.white;
  return [
    box(190, 150, 330, 360, C.ink, 40),
    bars('M246 466V420M296 466V382M346 466V330M396 466V262M446 466V196', C.ink, 26),
    tile(610, 150, 400, 360, { color: C.green, tint: C.greenTint, deg: -2, inner: bars('M680 450V330M750 450V330M820 450V330M890 450V330M960 450V330', W, 30) }),
  ];
};
