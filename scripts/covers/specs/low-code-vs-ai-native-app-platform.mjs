// Pages and scripts wired one to one (grey) against one object model (the
// indigo hero tile) that every view is projected from.
export const topic = 'app-building';
export const aria = 'Scattered grey pages joined by dotted wires, beside a blue object model with one hub and four connected objects.';

export default ({ C, box, line, arrow, tile, fill, dot, DOTTED }) => {
  const W = C.white;
  const hub = [760, 330];
  const nodes = [[654, 234], [866, 234], [654, 426], [866, 426]];
  const spokes = nodes.map(([x, y]) => {
    const dx = x - hub[0], dy = y - hub[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    return `M${Math.round(hub[0] + ux * 50)} ${Math.round(hub[1] + uy * 50)}L${Math.round(x - ux * 52)} ${Math.round(y - uy * 52)}`;
  }).join('');
  return [
    box(170, 150, 130, 96, C.grey, 26), line('M200 186H270M200 214H246', C.grey),
    box(320, 260, 130, 96, C.grey, 26), line('M350 296H420M350 324H396', C.grey),
    box(170, 400, 130, 96, C.grey, 26), line('M200 436H270M200 464H246', C.grey),
    line('M318 216C340 220 360 228 370 240', C.grey, 9, DOTTED),
    line('M370 376C360 388 340 396 318 400', C.grey, 9, DOTTED),
    arrow('M478 330H520'),
    tile(560, 160, 400, 340, { deg: 2, inner: [dot(hub[0], hub[1], 34, W), ...nodes.map(([x, y]) => fill(x - 38, y - 28, 76, 56, W, 18)), line(spokes, W, 10)] }),
  ];
};
