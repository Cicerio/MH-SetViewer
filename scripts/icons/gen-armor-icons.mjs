// Generates the 5 armor-piece types x 10 rarities of SVG icons from a single
// hand-drawn white (rarity 1) master SVG per piece type, by scaling grey fills/strokes
// toward each rarity's color.
//
// Why this works: every fill/stroke in a Rarity-1 master is a pure grey (#RRGGBB with
// R===G===B) — highlight, mid-tone, shadow, and the black lineart outline are just
// different grey levels. Comparing those grey levels against the already-recolored
// reference PNGs shows the relationship is exact multiplication per channel:
//   shadeColor = round(rarityColor * grey / 255)
// Black (0) always maps back to black for every rarity, so the lineart never needs
// special-casing — it falls out of the same formula.
//
// Setup:
//   1. Draw ONE lineart per piece type in white/grey/black, the same way you already
//      made public/icons/MH-Icons/Armor/<Piece>-Rarity-1.svg for Head/Chest/Arms/Waist/Legs.
//      Any number of grey shading levels is fine — the script doesn't care how many.
//   2. Fill in real hex codes for each rarity in rarity-colors.mjs.
//
// Run:
//   npm run icons:armor
//
// Output:
//   public/icons/MH-Icons/Armor/<Piece>-Rarity-<N>.svg for N = 2..10 (Rarity-1 is your
//   master file and is left untouched), overwriting any existing file with that name —
//   the same path ArmorBlock.jsx already reads.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RARITY_COLORS } from "./rarity-colors.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const armorDir = path.resolve(__dirname, "../../public/icons/MH-Icons/Armor");

const PIECES = ["Head", "Chest", "Arms", "Waist", "Legs"];
const HEX_COLOR = /#([0-9a-fA-F]{6})\b/g;

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function shadeFor(rarityRgb, grey) {
  return rgbToHex(rarityRgb.map((c) => Math.round((c * grey) / 255)));
}

function recolor(svgText, rarityRgb) {
  return svgText.replace(HEX_COLOR, (match, hex) => {
    const [r, g, b] = hexToRgb(hex);
    if (r !== g || g !== b) return match; // not a grey fill/stroke, leave as-is
    return shadeFor(rarityRgb, r);
  });
}

async function main() {
  let generated = 0;

  for (const piece of PIECES) {
    const masterPath = path.join(armorDir, `${piece}-Rarity-1.svg`);

    if (!existsSync(masterPath)) {
      console.warn(`skip ${piece}: no master at ${path.relative(process.cwd(), masterPath)}`);
      continue;
    }

    const master = await readFile(masterPath, "utf-8");

    for (const [rarity, hex] of Object.entries(RARITY_COLORS)) {
      if (rarity === "1") continue; // the master file already *is* rarity 1

      const rarityRgb = hexToRgb(hex.replace("#", ""));
      const svg = recolor(master, rarityRgb);
      const outPath = path.join(armorDir, `${piece}-Rarity-${rarity}.svg`);
      await writeFile(outPath, svg, "utf-8");
      generated++;
    }
  }

  console.log(`Generated ${generated} icon(s).`);
}

main();
