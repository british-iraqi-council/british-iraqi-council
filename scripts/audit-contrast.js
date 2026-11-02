globalThis.auditContrast = function auditContrast(doc) {
  const d = doc || document;
  const win = d.defaultView;

  const canvas = d.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const toRgba = (css) => {
    if (!css || css === "transparent") return [0, 0, 0, 0];
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = css;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillRect(0, 0, 1, 1);
    const p = ctx.getImageData(0, 0, 1, 1).data;
    return [p[0], p[1], p[2], p[3] / 255];
  };

  const over = (fg, bg) => {
    const a = fg[3];
    if (a >= 1) return [fg[0], fg[1], fg[2], 1];
    return [
      fg[0] * a + bg[0] * (1 - a),
      fg[1] * a + bg[1] * (1 - a),
      fg[2] * a + bg[2] * (1 - a),
      1,
    ];
  };

  const relLum = ([r, g, b]) => {
    const f = (v) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  const ratio = (a, b) => {
    const x = relLum(a);
    const y = relLum(b);
    const hi = Math.max(x, y);
    const lo = Math.min(x, y);
    return (hi + 0.05) / (lo + 0.05);
  };

  const effectiveBg = (el) => {
    let acc = null;
    let node = el;
    while (node && node !== d.documentElement.parentNode) {
      const cs = win.getComputedStyle(node);
      const c = toRgba(cs.backgroundColor);
      if (c[3] > 0) acc = acc === null ? c : over(acc, c);
      if (acc !== null && acc[3] >= 1) return acc;
      node = node.parentElement;
    }
    const rootBg = toRgba(
      win.getComputedStyle(d.documentElement).backgroundColor,
    );
    const base = rootBg[3] > 0 ? rootBg : [0, 0, 0, 1];
    return acc === null ? base : over(acc, base);
  };

  const hasOwnText = (el) => {
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.textContent.trim().length) return true;
    }
    return false;
  };

  const results = [];
  for (const el of d.querySelectorAll("body *")) {
    if (!hasOwnText(el)) continue;
    const cs = win.getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (Number(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (el.closest("[aria-hidden='true']")) continue;
    if (rect.width <= 1 && rect.height <= 1) continue;

    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    const requiredAA = isLarge ? 3 : 4.5;
    const requiredAAA = isLarge ? 4.5 : 7;

    const fg = over(toRgba(cs.color), effectiveBg(el));
    const bg = effectiveBg(el);
    const r = ratio(fg, bg);

    results.push({
      pass: r >= requiredAA,
      aaa: r >= requiredAAA,
      ratio: Math.round(r * 100) / 100,
      requiredAA,
      requiredAAA,
      size: Math.round(size * 10) / 10,
      weight,
      tag: el.tagName.toLowerCase(),
      cls: (el.className || "").toString().slice(0, 48),
      text: el.textContent.trim().slice(0, 44),
    });
  }

  const failures = results.filter((x) => !x.pass);
  const belowAAA = results.filter((x) => x.pass && !x.aaa);
  return { total: results.length, failures, belowAAA };
};
