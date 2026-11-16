// An email and a chat message both land in one case (the indigo hero tile),
// which carries its SLA clock.
export const topic = 'app-building';
export const aria = 'An email and a chat message both flow into one blue support case that carries a clock.';

export default ({ C, box, line, arrow, tile, ring }) => {
  const W = C.white;
  return [
    box(180, 120, 184, 126, C.ink, 28), line('M212 152l60 44 60-44'),
    line('M876 120H984a44 44 0 0 1 44 44v38a44 44 0 0 1-44 44H950l8 36-46-36H876a44 44 0 0 1-44-44v-38a44 44 0 0 1 44-44z'),
    line('M878 182H982'),
    arrow('M272 270C272 360 300 404 356 404'),
    arrow('M930 296C930 370 910 404 862 404'),
    tile(392, 306, 420, 236, {
      deg: 2,
      inner: [line('M442 384H632M442 462H592', W, 18), ring(722, 422, 46, W, 10), line('M722 394V422H744', W, 9)],
    }),
  ];
};
