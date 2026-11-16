// Two legacy systems (grey) feed one layer of business objects (the green
// hero tile); reports and work orders are built on that layer.
export const topic = 'integration-data';
export const aria = 'Two grey legacy databases feed a green layer of connected business objects, which feeds a report and a work order.';

export default ({ C, cylinder, arrow, tile, fill, line, box, bars, ring }) => {
  const W = C.white;
  return [
    cylinder(240, 160, 150, 110, { color: C.grey }),
    cylinder(240, 390, 150, 110, { color: C.grey }),
    arrow('M336 228C384 228 396 300 418 312'),
    arrow('M336 456C384 456 396 380 418 368'),
    tile(450, 200, 280, 280, {
      color: C.green, tint: C.greenTint,
      inner: [fill(490, 236, 80, 56, W, 18), fill(610, 312, 80, 56, W, 18), fill(490, 388, 80, 56, W, 18), line('M582 286L602 312M582 394L602 368', W, 10)],
    }),
    arrow('M766 270C800 270 806 225 822 225'),
    box(856, 150, 184, 150, C.ink, 32), bars('M908 266V232M946 266V196M984 266V220', C.ink, 22),
    arrow('M766 410C800 410 806 460 822 460'),
    box(856, 380, 184, 160, C.ink, 32), ring(894, 430, 13), line('M922 430H1004'), ring(894, 490, 13), line('M922 490H984'),
  ];
};
