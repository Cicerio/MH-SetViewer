// Shared "recolor a grayscale master SVG toward a rarity color" logic, used by both
// gen-armor-icons.mjs and gen-weapon-icons.mjs.
//
// A fill/stroke counts as a recolorable grey if its R/G/B channels are within
// GREY_TOLERANCE of each other. Exact greys (the armor masters) and near-greys from
// hand-drawn imprecision (the charge axe master has e.g. #c3c2c2, off by 1) both
// qualify and get the average of their channels scaled. Colors further off-grey than
// that — like the axe master's near-black ink #090405 — are left exactly as drawn,
// which is what you want for lineart that should stay ~black at every rarity anyway.
const GREY_TOLERANCE = 3;
const HEX_COLOR = /#([0-9a-fA-F]{6})\b/g;

export function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

export function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function shadeFor(rarityRgb, grey) {
  return rgbToHex(rarityRgb.map((c) => Math.round((c * grey) / 255)));
}

// shadeColor = round(rarityColor * grey / 255) per channel — see gen-armor-icons.mjs
// for how this ratio was derived from comparing white masters against reference art.
export function recolorSvg(svgText, rarityRgb) {
  return svgText.replace(HEX_COLOR, (match, hex) => {
    const [r, g, b] = hexToRgb(hex);
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    if (spread > GREY_TOLERANCE) return match;
    const grey = Math.round((r + g + b) / 3);
    return shadeFor(rarityRgb, grey);
  });
}
