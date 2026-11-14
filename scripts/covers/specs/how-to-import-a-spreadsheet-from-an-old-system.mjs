// Spreadsheet columns map into an object (the green hero tile) on a dry run;
// one row forks into created, skipped and failed. The one label: dryRun.
export const topic = 'integration-data';
export const aria = 'Three curves map spreadsheet columns into a green dry-run object marked dryRun; one row forks into created, skipped and failed.';

export default ({ C, STROKE, box, line, ring, arrow, tile, label, DASHED }) => [
  box(150, 100, 380, 210, C.ink, 36), line('M150 158H530'), line('M245 100V310M340 100V310M435 100V310', C.ink, 7, ' stroke-opacity=".4"'),
  line('M168 236H512', C.amber, 14),
  line('M548 236H636C684 236 684 140 736 140H744M636 236H744M636 236C684 236 684 332 736 332H744', C.amber, 7),
  ring(792, 140, 40, C.green, STROKE), line('M792 120v40M772 140h40', C.green, 11),
  ring(792, 236, 40, C.amber, STROKE), line('M772 236h40', C.amber, 11),
  ring(792, 332, 40, C.red, STROKE), line('M778 318l28 28M806 318l-28 28', C.red, 11),
  arrow('M400 330C400 400 460 432 568 432'), arrow('M300 330C300 440 400 486 568 486'), arrow('M200 330C200 500 320 540 568 540'),
  tile(600, 404, 428, 150, { color: C.green, tint: C.greenTint }),
  box(622, 424, 384, 110, C.white, 20, { w: 7, extra: DASHED }),
  label(814, 499, 'dryRun', C.white, 'middle'),
];
