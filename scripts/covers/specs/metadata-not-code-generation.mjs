// One request, two outputs: generated code drifts apart as a loose grey pile;
// generated metadata (the indigo hero tile) is one connected model.
export const aria = 'One request forks: one way to a loose grey pile of code, the other to a blue connected model.';

export default ({ C, box, line, dot, arrow, tile, fill }) => {
  const W = C.white;
  return [
    // the request
    line('M196 268H274a36 36 0 0 1 36 36v38a36 36 0 0 1-36 36H234l-40 34 10-34h-8a36 36 0 0 1-36-36v-38a36 36 0 0 1 36-36z'),
    dot(205, 323, 9), dot(235, 323, 9), dot(265, 323, 9),
    arrow('M340 300C420 300 440 198 516 198'),
    arrow('M340 346C420 346 440 436 536 436'),
    // generated code: three pieces that no longer line up
    box(560, 106, 230, 52, C.grey, 22), line('M592 132H700', C.grey, 9),
    box(604, 172, 230, 52, C.grey, 22), line('M636 198H760', C.grey, 9),
    box(548, 238, 230, 52, C.grey, 22), line('M580 264H670', C.grey, 9),
    // generated metadata: one model, connected
    tile(600, 326, 400, 226, {
      inner: [
        fill(648, 360, 76, 48, W, 18), fill(876, 360, 76, 48, W, 18),
        fill(648, 470, 76, 48, W, 18), fill(876, 470, 76, 48, W, 18),
        line('M740 384H860M740 494H860M686 424V454M914 424V454', W, 9),
      ],
    }),
  ];
};
