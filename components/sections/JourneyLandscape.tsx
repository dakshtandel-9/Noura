/**
 * Decorative misty-mountain band for the foot of the journey strip: layered ridges that
 * fade into haze, with a stand of pines on the right. Drawn, not photographed, so it
 * implies no real place (docs/media-motion.md). Paths are computed once from fixed seeds,
 * so the markup is static and identical on every render.
 */

const W = 1440;
const H = 400;
/** Horizontal spacing of ridge samples. */
const STEP = 6;

/** Small deterministic PRNG (mulberry32). */
function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

type Peaks = [number, number][];

/** A drawn ridge: its closed path, and the height of the line actually drawn at any x. */
type Ridge = { d: string; top: (x: number) => number };

/** A ridge line through `peaks`, roughened by `jag`, closed along the bottom edge. */
function ridge(peaks: Peaks, jag: number, seed: number): Ridge {
  const rnd = random(seed);
  const s1 = rnd() * 10;
  const s2 = rnd() * 10;
  const ys: number[] = [];
  let [x0, y0] = peaks[0] ?? [0, H];
  let seg = 1;
  for (let x = 0; x <= W; x += STEP) {
    // Advance to the pair of peaks either side of x.
    while (seg < peaks.length - 1 && (peaks[seg]?.[0] ?? W) < x) {
      [x0, y0] = peaks[seg] ?? [x0, y0];
      seg++;
    }
    const [x1, y1] = peaks[seg] ?? [x0, y0];
    const t = x1 === x0 ? 0 : (x - x0) / (x1 - x0);
    const y = y0 + (y1 - y0) * (1 - Math.cos(t * Math.PI)) * 0.5;
    const rough = Math.sin(x * 0.045 + s1) * 0.5 + Math.sin(x * 0.13 + s2) * 0.3 + (rnd() - 0.5) * 0.5;
    ys.push(f(y + rough * jag));
  }
  // Trees stand on this, rather than on the smooth curve, so none float over a dip.
  const top = (x: number) => {
    const i = Math.min(ys.length - 2, Math.max(0, Math.floor(x / STEP)));
    const t = Math.min(1, Math.max(0, x / STEP - i));
    const a = ys[i] ?? H;
    return a + ((ys[i + 1] ?? a) - a) * t;
  };
  return { d: `M0 ${H}L${ys.map((y, i) => `${i * STEP} ${y}`).join("L")}L${W} ${H}Z`, top };
}

const far = ridge([[0, 214], [120, 200], [240, 212], [360, 178], [470, 194], [600, 152], [700, 170], [800, 136], [900, 160], [1000, 124], [1090, 148], [1170, 108], [1270, 140], [1360, 124], [1440, 136]], 4, 11);
const middle = ridge([[0, 262], [130, 250], [270, 262], [400, 236], [520, 248], [650, 222], [770, 238], [880, 206], [980, 190], [1070, 170], [1140, 192], [1220, 180], [1320, 206], [1440, 198]], 5, 23);
const near = ridge([[0, 300], [150, 288], [310, 302], [470, 282], [610, 294], [770, 276], [910, 290], [1050, 268], [1190, 282], [1310, 262], [1440, 272]], 3, 37);
const ground = ridge([[0, 318], [140, 326], [320, 352], [520, 382], [720, 396], [900, 392], [1080, 368], [1240, 342], [1440, 326]], 2, 41);

/** A closed polygon as one absolute move and relative line segments. */
function relative(pts: [number, number][]) {
  const [first, ...rest] = pts;
  if (!first) return "";
  let [px, py] = first;
  let d = `M${f(px)} ${f(py)}l`;
  for (const [x, y] of rest) {
    d += `${f(x - px)} ${f(y - py)} `;
    [px, py] = [x, y];
  }
  return `${d.trimEnd()}z`;
}

/**
 * One spruce as a single solid outline: tiers of boughs that droop from the stem to their
 * tips, narrowing to a spire, on a short trunk. The body stays filled between tiers, so the
 * tree reads as foliage even a few pixels tall. Every outline winds the same way, so
 * overlapping trees in one path never cut holes in each other.
 */
function spruce(x: number, base: number, h: number, rnd: () => number) {
  const tiers = Math.min(18, Math.max(3, Math.round(h / 4.2)));
  const reachMax = h * (0.15 + rnd() * 0.06);
  const trunk = Math.max(0.35, h * 0.015);
  const crown = base - h * 0.07; // where the lowest boughs attach
  const top = base - h;
  const spacing = (crown - top) / tiers;
  const lean = (rnd() - 0.5) * h * 0.04;

  const side = (dir: -1 | 1) => {
    const pts: [number, number][] = [
      [x + dir * trunk, base + 2],
      [x + dir * trunk, crown],
    ];
    for (let k = 0; k < tiers; k++) {
      const u = (k + (k ? (rnd() - 0.5) * 0.45 : 0)) / tiers;
      const cx = x + lean * u;
      const y = crown - (crown - top) * u;
      let reach = reachMax * Math.pow(1 - u, 0.85) * (0.78 + rnd() * 0.4);
      if (rnd() < 0.08) reach *= 0.6; // the odd short bough
      // Notch at the stem, then out and down to the drooping tip.
      pts.push([cx + dir * Math.max(trunk * 1.3, reach * (0.22 + rnd() * 0.16)), y]);
      pts.push([cx + dir * reach, y + spacing * (0.55 + rnd() * 0.4)]);
    }
    return pts;
  };

  return relative([...side(-1), [x + lean, top], ...side(1).reverse()]);
}

type GroveOptions = {
  /** > 0 makes trees taller towards `to`, < 0 towards `from`. */
  rise?: number;
  /** How far below the ridge line the trunks are planted. */
  sink?: number;
  /** Distances over which the stand thins out at each end, so it never starts at a hard line. */
  fadeIn?: number;
  fadeOut?: number;
};

/** A stand of spruces between `from` and `to`, irregularly spaced and rooted on `land`. */
function grove(
  land: Ridge,
  from: number,
  to: number,
  [minGap, maxGap]: [number, number],
  [minH, maxH]: [number, number],
  seed: number,
  { rise = 0, sink = 3, fadeIn = 0, fadeOut = 0 }: GroveOptions = {},
) {
  const rnd = random(seed);
  const trees: string[] = [];
  for (let x = from; x <= to; x += minGap + rnd() * (maxGap - minGap)) {
    const edge = (x - from) / (to - from);
    const taper = Math.min(1, fadeIn ? (x - from) / fadeIn : 1, fadeOut ? (to - x) / fadeOut : 1);
    if (rnd() > 0.25 + taper) continue; // sparser towards a fading end
    const h = (minH + Math.pow(rnd(), 1.4) * (maxH - minH)) * (1 + rise * (edge - 0.5)) * (0.55 + 0.45 * taper);
    const tx = x + (rnd() - 0.5) * minGap * 0.6;
    trees.push(spruce(tx, land.top(tx) + sink + rnd() * 1.5, h, rnd));
  }
  return trees.join("");
}

// Back to front. Each stand gets paler with distance, and the back forest is planted behind
// the crest of the ground so the hill hides its feet.
const distantTrees = grove(middle, 880, W + 6, [3, 6], [4, 10], 5, { rise: 0.6, sink: 1.5, fadeIn: 160 });
const midTrees = grove(near, 1040, W + 6, [4, 8], [7, 20], 13, { rise: 0.7, sink: 2, fadeIn: 180 });
const backForest = grove(ground, 1150, W + 8, [6, 11], [24, 60], 29, { rise: 0.8, sink: 9, fadeIn: 90 });
const leftTrees = grove(ground, -6, 175, [6, 18], [14, 42], 7, { rise: -0.9, fadeOut: 70 });
const frontForest = grove(ground, 1085, W + 8, [7, 13], [20, 74], 17, { rise: 0.9, fadeIn: 120 });

/** `idPrefix` keeps gradient ids unique when the landscape is drawn more than once per page. */
export function JourneyLandscape({ className, idPrefix = "journey" }: { className?: string; idPrefix?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${idPrefix}-far`} x1="0" y1="100" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c8bcae" />
          <stop offset="1" stopColor="#ece6dc" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-middle`} x1="0" y1="170" x2="0" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a39486" />
          <stop offset="1" stopColor="#e2d9cc" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-near`} x1="0" y1="260" x2="0" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#857869" />
          <stop offset="1" stopColor="#d3c9bb" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-ground`} x1="0" y1="318" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5f574c" />
          <stop offset="1" stopColor="#4b463d" />
        </linearGradient>
        {/* Dark crowns settling into the colour of the ground at their feet. */}
        <linearGradient id={`${idPrefix}-trees`} x1="0" y1="290" x2="0" y2="372" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2e3029" />
          <stop offset="1" stopColor="#4e483f" />
        </linearGradient>
      </defs>
      <path d={far.d} fill={`url(#${idPrefix}-far)`} />
      <path d={middle.d} fill={`url(#${idPrefix}-middle)`} />
      <path d={distantTrees} fill="#a89c8f" />
      <path d={near.d} fill={`url(#${idPrefix}-near)`} />
      <path d={midTrees} fill="#7c7164" />
      <path d={backForest} fill="#4a473f" />
      <path d={ground.d} fill={`url(#${idPrefix}-ground)`} />
      <path d={leftTrees} fill={`url(#${idPrefix}-trees)`} />
      <path d={frontForest} fill={`url(#${idPrefix}-trees)`} />
    </svg>
  );
}
