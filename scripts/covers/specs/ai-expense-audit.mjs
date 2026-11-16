// A receipt is checked against the expense policy (the green hero tile): a
// claim within policy passes, one outside it is stopped.
export const topic = 'app-building';
export const aria = 'A receipt is checked against a green policy; one path passes to a check, the other is stopped.';

export default ({ C, line, arrow, tile, dot, ring, stopBar }) => {
  const W = C.white;
  return [
    line('M184 150H316V470l-22-18-22 18-22-18-22 18-22-18-22 18z'),
    line('M214 214H286M214 266H286M214 318H260'),
    arrow('M346 310H392'),
    tile(430, 160, 320, 300, {
      color: C.green, tint: C.greenTint, deg: 2,
      inner: [dot(492, 240, 13, W), line('M528 240H690', W, 18), dot(492, 310, 13, W), line('M528 310H660', W, 18), dot(492, 380, 13, W), line('M528 380H680', W, 18)],
    }),
    arrow('M790 250C836 250 846 212 862 212'),
    ring(950, 210, 52, C.green), line('M926 212l16 16 32-32', C.green, 11),
    line('M790 380C840 380 860 420 900 420', C.red, 7), stopBar(916, 420),
  ];
};
