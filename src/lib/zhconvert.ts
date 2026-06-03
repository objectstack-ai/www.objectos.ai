import * as OpenCC from 'opencc-js';

// Simplified (mainland) -> Traditional (Taiwan, with phrase conversion).
// Used at build time to derive zh-Hant UI strings and term labels from
// zh-Hans, so we never maintain Traditional copies of fixed strings by hand.
const convert = OpenCC.Converter({ from: 'cn', to: 'twp' });

export const s2t = (s: string): string => convert(s);
