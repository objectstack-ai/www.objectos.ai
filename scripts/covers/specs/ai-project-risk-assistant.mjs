// Status updates feed the plan (the indigo hero tile); one task's bar is
// projected past the milestone flag, as a dashed slip.
export const topic = 'app-building';
export const aria = 'Two status notes feed a blue project plan in which one bar is projected past the milestone flag.';

export default ({ C, box, line, arrow, tile, DASHED }) => {
  const W = C.white;
  return [
    box(170, 170, 196, 120, C.grey, 30), line('M204 214H332M204 250H294', C.grey),
    box(170, 350, 196, 120, C.grey, 30), line('M204 394H320M204 430H280', C.grey),
    arrow('M394 320H434'),
    tile(470, 170, 500, 300, {
      deg: -2,
      inner: [
        line('M860 196V232M860 196h56l-12 14 12 14h-56', W, 9),
        line('M526 264H680', W, 22), line('M606 332H780', W, 22),
        line('M686 400H820', W, 22), line('M856 400H950', W, 14, ' stroke-dasharray="14 26"'),
      ],
    }),
  ];
};
