// Generates 10 rarity SVG icons per weapon type from a single hand-drawn white
// (rarity 1) master SVG, the same way gen-armor-icons.mjs does for armor pieces —
// see that file's header comment and recolor.mjs for how/why the recoloring works.
//
// Only Charge Blade exists as a drawn master right now. Add more weapon types here
// as you draw them (each needs its own <WeaponType>-Rarity-1.svg master already in
// public/icons/MH-Icons/Weapons/).
//
// Setup:
//   1. Draw ONE lineart per weapon type in white/grey/black, like you already did for
//      public/icons/MH-Icons/Weapons/ChargeBlade-Rarity-1.svg.
//   2. Fill in real hex codes for each rarity in rarity-colors.mjs (shared with armor).
//
// Run:
//   npm run icons:weapons
//
// Output:
//   public/icons/MH-Icons/Weapons/<WeaponType>-Rarity-<N>.svg for N = 2..10
//   (Rarity-1 is your master file and is left untouched), overwriting any existing
//   file with that name — the same path helpers.js's getWeaponIconURL already reads.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RARITY_COLORS } from "./rarity-colors.mjs";
import { hexToRgb, recolorSvg } from "./recolor.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const weaponsDir = path.resolve(__dirname, "../../public/icons/MH-Icons/Weapons");

const WEAPON_TYPES = ["ChargeBlade"];

async function main() {
  let generated = 0;

  for (const weaponType of WEAPON_TYPES) {
    const masterPath = path.join(weaponsDir, `${weaponType}-Rarity-1.svg`);

    if (!existsSync(masterPath)) {
      console.warn(`skip ${weaponType}: no master at ${path.relative(process.cwd(), masterPath)}`);
      continue;
    }

    const master = await readFile(masterPath, "utf-8");

    for (const [rarity, hex] of Object.entries(RARITY_COLORS)) {
      if (rarity === "1") continue; // the master file already *is* rarity 1

      const svg = recolorSvg(master, hexToRgb(hex));
      const outPath = path.join(weaponsDir, `${weaponType}-Rarity-${rarity}.svg`);
      await writeFile(outPath, svg, "utf-8");
      generated++;
    }
  }

  console.log(`Generated ${generated} weapon icon(s).`);
}

main();
