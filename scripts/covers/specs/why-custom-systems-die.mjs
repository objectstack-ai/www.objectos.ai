// The ossified system (grey, locked) keeps costing while the changes it
// delivers fall year by year (the descending bars on the indigo hero tile).
export const topic = 'modernization';
export const aria = 'A grey locked system beside a blue chart whose bars fall year by year.';

export default ({ C, box, line, arrow, tile, bars }) => {
  const W = C.white;
  return [
    box(170, 170, 240, 300, C.grey, 36), line('M210 226H370M210 270H330', C.grey),
    box(250, 350, 80, 64, C.ink, 16), line('M264 350v-22a26 26 0 0 1 52 0v22'),
    arrow('M440 320H516'),
    tile(556, 170, 420, 320, { inner: bars('M626 430V220M701 430V284M776 430V324M851 430V364M926 430V398', W, 40) }),
  ];
};
