// Four stages off a legacy system (grey): three steps that can still go
// back (the dotted return), then the one-way cut-over into a table the
// platform owns (the indigo hero tile).
export const topic = 'modernization';
export const aria = 'A grey legacy database steps through three reversible stages, then one way into a blue table the platform owns.';

export default ({ C, cylinder, ring, line, arrow, tile, DOTTED }) => {
  const W = C.white;
  return [
    cylinder(260, 224, 200, 200, { color: C.grey, bands: 2 }),
    line('M384 340H420'), ring(470, 340, 30),
    line('M520 340H540'), ring(590, 340, 30),
    line('M640 340H660'), ring(710, 340, 30),
    // stages one to three can still go back
    arrow('M710 288C710 150 480 128 392 166', C.ink, 9, DOTTED),
    // stage four is the one-way door
    arrow('M760 340H778'),
    tile(812, 125, 214, 420, { inner: line('M854 255H984M854 335H954M854 415H974', W, 18) }),
  ];
};
