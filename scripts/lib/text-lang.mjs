// What language a built page's body is actually written in, scope by scope.
//
// `<html lang>` is a claim, and on this site the claim and the content can
// diverge by construction: every page type with a fallback design (marketing,
// glossary, pricing, legal, security) renders at all eight locale URLs, and
// where a locale has no authored copy the body is English under the locale's
// `lang`. A reader's screen reader then pronounces English with a German or
// Japanese voice (WCAG 3.1.1 / 3.1.2), and a search engine is told a page is
// German when it is not. `scripts/seo-smoke.mjs` uses this module to assert
// that the text inside `<main>` is written in the language its nearest `lang`
// attribute declares — so the fix (a `lang="en"` on the fallback body) cannot
// silently come undone.
//
// It is a coarse identifier on purpose, tuned to the eight locales this site
// builds, not a general one:
//   * CJK is decided by script: Hangul -> ko, kana -> ja, Han alone -> zh, with
//     zh-Hans and zh-Hant told apart by characters that differ between the two
//     scripts (这/這, 们/們, ...).
//   * Latin-script text is decided by stopwords that are distinctive to one of
//     en/de/es/fr. Words shared by two of them (de, la, en, que, es, un, ...)
//     are left out of every list, so they cannot vote.
//   * Too little text, or no clear winner, answers `null` — "cannot tell" — and
//     the caller treats that as no evidence either way. Product names, code and
//     `translate="no"` spans are not prose and are not counted.

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source',
  'track', 'wbr',
]);
/** Elements whose content is not prose in the page's language. */
const SKIP_ELEMENTS = new Set([
  'script', 'style', 'template', 'noscript', 'svg', 'math', 'pre', 'code', 'kbd', 'samp',
  'textarea',
]);
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title']);

/** Index of the `>` closing a tag, honouring quoted attribute values. */
function tagEnd(html, from) {
  let quote = null;
  for (let i = from; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === '>') {
      return i;
    }
  }
  return -1;
}

function attribute(source, name) {
  const m = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, 'i').exec(
    source
  );
  return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
}

export function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Elements that do not end a run of prose: text inside them continues the block. */
const INLINE_ELEMENTS = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'data', 'del', 'dfn', 'em', 'i', 'ins', 'mark', 'q',
  's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'br',
]);

/**
 * The prose inside `<main>`, as blocks: runs of text between block-level
 * boundaries, each tagged with the language it is declared to be in (its
 * nearest ancestor `lang`, else the document's `<html lang>`). A change of
 * declared language starts a new block too, so a `lang="en"` span inside a
 * German paragraph is its own block. Returns `null` when the document has no
 * `<main>` — a page with no main landmark is something else's finding, and
 * "no text" must not read as "no mismatch".
 */
export function mainBlocks(html) {
  const htmlLang = attribute(/<html\b([^>]*)>/i.exec(html)?.[1] ?? '', 'lang') ?? '';
  const stack = [{ name: '#root', lang: htmlLang, skip: false, inMain: false }];
  const blocks = [];
  let current = null;
  let sawMain = false;
  let i = 0;
  const top = () => stack[stack.length - 1];
  const flush = () => {
    if (current && current.text.trim()) blocks.push({ lang: current.lang, text: current.text.trim() });
    current = null;
  };
  const emit = (text) => {
    const frame = top();
    if (!frame.inMain || frame.skip) return;
    const value = decodeEntities(text);
    if (!value.trim()) {
      if (current) current.text += ' ';
      return;
    }
    if (current && current.lang !== frame.lang) flush();
    current ??= { lang: frame.lang, text: '' };
    current.text += value;
  };
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      emit(html.slice(i));
      break;
    }
    if (lt > i) emit(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    if (html.startsWith('<!', lt)) {
      const end = tagEnd(html, lt + 2);
      i = end === -1 ? html.length : end + 1;
      continue;
    }
    const tag = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt, lt + 64));
    if (!tag) {
      emit('<');
      i = lt + 1;
      continue;
    }
    const closing = tag[1] === '/';
    const name = tag[2].toLowerCase();
    const end = tagEnd(html, lt + tag[0].length);
    if (end === -1) break;
    const source = html.slice(lt + tag[0].length, end);
    const selfClosing = html[end - 1] === '/';
    i = end + 1;
    if (!INLINE_ELEMENTS.has(name)) flush();
    else if (name === 'br' && current) current.text += ' ';
    if (closing) {
      const at = stack.map((frame) => frame.name).lastIndexOf(name);
      if (at > 0) stack.length = at;
      continue;
    }
    if (RAW_TEXT_ELEMENTS.has(name) && !selfClosing) {
      const close = html.toLowerCase().indexOf(`</${name}`, i);
      i = close === -1 ? html.length : close;
      continue;
    }
    if (VOID_ELEMENTS.has(name) || selfClosing) continue;
    const parent = top();
    if (name === 'main') sawMain = true;
    stack.push({
      name,
      lang: attribute(source, 'lang') ?? parent.lang,
      inMain: parent.inMain || name === 'main',
      skip:
        parent.skip ||
        SKIP_ELEMENTS.has(name) ||
        attribute(source, 'translate') === 'no' ||
        attribute(source, 'aria-hidden') === 'true',
    });
  }
  flush();
  return sawMain ? blocks : null;
}

/**
 * Every block inside `<main>` whose text is confidently in a language other
 * than the one it is declared in, plus the declared-language totals the
 * verdict was drawn from. Short blocks (a label, a button) carry too little
 * text to judge and are skipped, never counted as agreement.
 */
export function languageMismatches(html) {
  const blocks = mainBlocks(html);
  if (blocks === null) return null;
  const mismatches = [];
  // Declared languages that at least one block was confirmed to be written in:
  // the caller's evidence that the check measured something per locale.
  const confirmed = new Set();
  let judged = 0;
  for (const block of blocks) {
    const detected = detectLanguage(block.text);
    if (!detected) continue;
    judged++;
    if (sameLanguage(detected, block.lang)) confirmed.add(block.lang);
    else mismatches.push({ ...block, detected });
  }
  return { blocks: blocks.length, judged, confirmed, mismatches };
}

/** `detected` is one of the eight site locales; `declared` is any BCP 47 tag. */
export function sameLanguage(detected, declared) {
  const tag = String(declared).toLowerCase();
  if (detected === 'zh-Hans') return tag === 'zh-hans' || tag === 'zh-cn' || tag === 'zh-sg';
  if (detected === 'zh-Hant') return tag === 'zh-hant' || tag === 'zh-tw' || tag === 'zh-hk';
  return tag === detected || tag.startsWith(`${detected}-`);
}

// Stopwords distinctive to one language. A word that is common in two of the
// four (de/la/en/que/es/un/se/no/a/o/le/et/die/...) is in none of the lists.
const STOPWORDS = {
  en: [
    'the', 'and', 'of', 'to', 'is', 'that', 'it', 'for', 'with', 'as', 'are', 'be', 'this', 'by',
    'not', 'or', 'from', 'your', 'you', 'can', 'which', 'what', 'when', 'its', 'have', 'has',
    'they', 'their', 'into', 'than', 'but', 'does', 'do', 'only', 'every', 'how', 'who', 'should',
    'would', 'about', 'there', 'these', 'those', 'where', 'without', 'each',
  ],
  de: [
    'der', 'das', 'und', 'ist', 'nicht', 'mit', 'den', 'ein', 'eine', 'auf', 'für', 'von', 'zu',
    'im', 'sich', 'auch', 'als', 'wird', 'werden', 'dem', 'oder', 'bei', 'wie', 'nur', 'sind',
    'kann', 'ihre', 'ihr', 'sie', 'aus', 'nach', 'wenn', 'über', 'einen', 'durch', 'dass', 'diese',
    'jede', 'ohne', 'noch', 'statt', 'wer', 'zum', 'zur', 'einer', 'eines',
  ],
  es: [
    'el', 'los', 'las', 'del', 'y', 'por', 'para', 'con', 'su', 'sus', 'al', 'lo', 'como', 'más',
    'pero', 'sin', 'sobre', 'este', 'esta', 'cada', 'puede', 'tus', 'qué', 'cómo', 'cuando',
    'también', 'ya', 'hay', 'muy', 'una', 'uno', 'está', 'están', 'quien', 'nuestro', 'otro',
    'todo', 'todos', 'hasta', 'desde',
  ],
  fr: [
    'les', 'du', 'est', 'une', 'qui', 'dans', 'pour', 'pas', 'sur', 'au', 'aux', 'avec', 'ce',
    'cette', 'il', 'ne', 'par', 'sont', 'ou', 'votre', 'vos', 'chaque', 'peut', 'sans', 'être',
    'leur', 'leurs', 'mais', 'nous', 'vous', 'comme', 'tout', 'tous', 'quand', 'où', 'aussi',
    'très', 'ces', 'ses', 'déjà', 'donc',
  ],
};
const STOPWORD_LANG = new Map();
for (const [lang, words] of Object.entries(STOPWORDS)) {
  for (const word of words) {
    if (STOPWORD_LANG.has(word)) throw new Error(`text-lang: stopword "${word}" is in two lists`);
    STOPWORD_LANG.set(word, lang);
  }
}

// Characters that are written differently in Simplified and Traditional
// Chinese, as pairs. Common enough that any real paragraph has several.
const ZH_PAIRS = [
  '这這', '们們', '个個', '说說', '为為', '对對', '会會', '过過', '时時', '发發', '与與', '学學',
  '实實', '应應', '业業', '务務', '数數', '据據', '开開', '关關', '体體', '点點', '经經', '问問',
  '题題', '动動', '后後', '从從', '现現', '进進', '还還', '种種', '当當', '区區', '导導', '专專',
  '无無', '条條', '产產', '将將', '设設', '计計', '质質', '价價', '权權', '调調', '选選', '构構',
  '层層', '证證', '级級', '页頁', '读讀', '写寫', '语語', '让讓', '认認', '识識', '变變', '边邊',
  '运運', '维維', '组組', '织織', '网網', '络絡', '软軟', '统統', '审審', '码碼', '录錄', '图圖',
];
const HANS = new Set(ZH_PAIRS.map((pair) => pair[0]));
const HANT = new Set(ZH_PAIRS.map((pair) => pair[1]));

const MIN_LATIN_STOPWORDS = 8;
const MIN_CJK_CHARS = 20;

/**
 * The language `text` is written in — one of the eight site locales — or
 * `null` when there is too little text or no clear winner.
 */
export function detectLanguage(text) {
  let hangul = 0;
  let kana = 0;
  let han = 0;
  let latin = 0;
  let hans = 0;
  let hant = 0;
  for (const ch of text) {
    if (/\p{Script=Hangul}/u.test(ch)) hangul++;
    else if (/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(ch) && ch !== 'ー' && ch !== '・') kana++;
    else if (/\p{Script=Han}/u.test(ch)) {
      han++;
      if (HANS.has(ch)) hans++;
      else if (HANT.has(ch)) hant++;
    } else if (/\p{Script=Latin}/u.test(ch)) latin++;
  }
  const cjk = hangul + kana + han;
  // A CJK sentence carries Latin product names and acronyms (ObjectStack, MCP,
  // AI), and a Latin sentence almost never carries CJK. One CJK character
  // stands for roughly a word, so it is weighed against Latin letters / 4.
  if (cjk >= MIN_CJK_CHARS && cjk >= latin / 4) {
    if (hangul >= (kana + han) / 2) return 'ko';
    if (kana >= (kana + han) * 0.08) return 'ja';
    if (hans + hant < 3) return null;
    if (hans >= hant * 3) return 'zh-Hans';
    if (hant >= hans * 3) return 'zh-Hant';
    return null;
  }
  if (cjk >= MIN_CJK_CHARS && cjk * 4 >= latin / 4) return null;
  const votes = { en: 0, de: 0, es: 0, fr: 0 };
  let total = 0;
  for (const word of text.toLowerCase().match(/\p{L}+/gu) ?? []) {
    const lang = STOPWORD_LANG.get(word);
    if (!lang) continue;
    votes[lang]++;
    total++;
  }
  if (total < MIN_LATIN_STOPWORDS) return null;
  const [first, second] = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  if (first[1] < second[1] * 2) return null;
  return first[0];
}
