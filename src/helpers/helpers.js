// A file for commonly used functions
/**
 * Converts a number to a string representation with at least three digits.
 *
 * @param {number} number - The number to be converted.
 * @return {string} The string representation of the number with at least three digits.
 */
export function convertToThreeDigits(number) {
  return number.toString().padStart(3, '0');
}

// START OF DATA FUNCTIONS

/**
 * Retrieves the name of a weapon from the given weaponData based on the weaponID.
 * Only works for charge blades ATM, have to fix that later
 *
 * @param {Object} weaponData - The data containing information about the weapons.
 * @param {number} weaponID - The ID of the weapon.
 * @return {string} The name of the weapon if found, otherwise "unfound".
 */
export function getWeaponName(weaponData, weaponID) {
  return weaponData
    ? weaponData.charge_axe.name.entries.find(obj =>
      obj.name === 'W_ChargeAxe_' + convertToThreeDigits(weaponID) + '_Name')?.content[1]
    : "unfound";
}
/**
 * Retrieves the base data of a weapon from the given weaponData based on the weaponID.
 *
 * @param {Object} weaponData - The data containing information about the weapons.
 * @param {number} weaponID - The ID of the weapon.
 * @return {Object|null} The base data of the weapon if found, otherwise null.
 */
export function getWeaponBaseData(weaponData, weaponID) {
  return weaponData
    ? weaponData.charge_axe.base_data.param.find(obj => obj.base.base.base.base.id.ChargeAxe === weaponID)
    : null;
}
export function getTrueRawAttack(attack, sharpnessBlock) {
  if (!Array.isArray(sharpnessBlock)) {
    return attack;
  }
  let sharpLevel = 0, sharpMod = 0;
  sharpnessBlock.forEach(element => {
    if (element) {
      sharpLevel++
    }
    switch (sharpLevel) {
      case 1, 2, 3:
        sharpMod = 0.5 + ((sharpLevel - 1) * 0.25);
        break
      case 4:
        sharpMod = 1.05
        break
      case 5:
        sharpMod = 1.20
        break
      case 6:
        sharpMod = 1.32
        break
      case 7:
        sharpMod = 1.39
        break
    }
  });
  return attack * sharpMod;
}
export function getWeaponIconURL(type, rarity) {
  switch (type) {
    case 1:
      return "icons/MH-Icons/Weapons/Greatsword-Rarity-" + rarity + ".png";
    case 2:

    case 3:

    case 4:

    case 5:

    case 6:

    case 7:

    case 8:

    case 9:

    case 10: // Charge Blade
      return "icons/MH-Icons/Weapons/ChargeBlade-Rarity-" + (rarity || 1) + ".svg";
    case 11:

    case 12:

    case 13:

    case 14:

  }
}
export function getEquipmentName(armorData, armorID, type) {
  switch (type) {
    case "set":
      return armorData
        ? armorData.armor_series_name_msg.entries.find(obj =>
          obj.name === "ArmorSeries_Hunter_" + convertToThreeDigits(armorID))?.content[1]
        : "unfound";
    case "armor":
      const nameID = convertToThreeDigits(element);
      const nameData = armorData[armorTypeRefs[index]];
      let armorName = nameData ? nameData.entries.find(obj => obj.name === 'A_' + [armorTypes[index]] + '_' + nameID + '_Name')?.content[1] : "unfound";
      return armorName;
  }
}
export function getEquipmentBaseData(armorData, armorID, type) {
  const armorTypes = ["Head", "Chest", "Arm", "Waist", "Leg"];
  return armorData
    ? armorData.armor.param.find(obj =>
      obj.pl_armor_id[armorTypes[type]] === armorID)
    : null;
}
export function getIconURL(stat) {
  switch (stat) {
    case "swordhilt":
      return "icons/filter-svgrepo-com.svg";
    case (null || undefined): 
      return "icons/default.svg"
    default: 
      case (stat.startsWith("elm")):
        return "icons/Custom Icons/stats/elm-"+ stat.toLowerCase() + ".svg"
      
  } 

}
// --- Armor series list (rank-tabbed equipment picker) ---
// The raw armor_series -> armor_series_name_msg name table is shifted +2 relative to the
// stat data for a wide range of series (confirmed by cross-checking against real in-game sets
// via each series' own Head piece name, which is resolved through a separate id space —
// pl_armor_id — and is reliable). See armorSeriesName/anyArmorPieceName below.
const ARMOR_PIECE_TABLES = {
  Head: ['armor_head_name_msg', 'armor_head_name_msg_mr'],
  Chest: ['armor_chest_name_msg', 'armor_chest_name_msg_mr'],
  Arm: ['armor_arm_name_msg', 'armor_arm_name_msg_mr'],
  Waist: ['armor_waist_name_msg', 'armor_waist_name_msg_mr'],
  Leg: ['armor_leg_name_msg', 'armor_leg_name_msg_mr'],
};
const ARMOR_ICON_FILE_TYPES = { Head: 'Head', Chest: 'Chest', Arm: 'Arms', Waist: 'Waist', Leg: 'Legs' };
// Series confirmed correct in-game despite failing the name/piece word-overlap check (thematic/
// synonym naming the check can't catch, e.g. "Lucent" vs "Lambent Casque").
const ARMOR_CONFIRMED_CORRECT = new Set([419, 420, 431, 441]);

function isUsableArmorName(name) {
  return !!name && name.trim() !== '' && !name.includes('Rejected');
}

function armorSeriesName(armorData, id) {
  const key = 'ArmorSeries_Hunter_' + convertToThreeDigits(id);
  const base = armorData.armor_series_name_msg.entries.find(e => e.name === key);
  if (isUsableArmorName(base?.content[1])) return base.content[1];
  const mr = armorData.armor_series_name_msg_mr.entries.find(e => e.name === key);
  return isUsableArmorName(mr?.content[1]) ? mr.content[1] : null;
}

// Tries Head first, then falls back through Chest/Arm/Waist/Leg for series missing a Head
// piece (e.g. Jaggi S is Arm+Leg only), skipping any piece whose name is blank/unlocalized.
function anyArmorPieceName(armorData, seriesId) {
  for (const type of ['Head', 'Chest', 'Arm', 'Waist', 'Leg']) {
    const piece = armorData.armor.param.find(p => p.series === seriesId && p.pl_armor_id[type] != null);
    if (!piece) continue;
    const key = 'A_' + type + '_' + convertToThreeDigits(piece.pl_armor_id[type]) + '_Name';
    const [baseTable, mrTable] = ARMOR_PIECE_TABLES[type];
    const base = armorData[baseTable].entries.find(e => e.name === key);
    if (isUsableArmorName(base?.content[1])) return { type, name: base.content[1] };
    const mr = armorData[mrTable].entries.find(e => e.name === key);
    if (isUsableArmorName(mr?.content[1])) return { type, name: mr.content[1] };
  }
  return null;
}

function normalizeArmorName(str) {
  return str.toLowerCase().replace(/'s\b/g, '').replace(/[^a-z0-9]/g, '');
}
function armorNameRelatesToPiece(seriesName, pieceName) {
  if (!seriesName || !pieceName) return false;
  const s = normalizeArmorName(seriesName);
  const firstWord = normalizeArmorName(pieceName.split(' ')[0]);
  const p = normalizeArmorName(pieceName);
  if (!firstWord) return false;
  return s.includes(firstWord) || p.includes(s);
}

// Layered Armor (cosmetic-only skins, no gameplay stats) share a data signature: their
// armor.param pieces are all dummy zero-stat placeholders (def 0, no skills) — the real
// cosmetic data lives in the separate `overwear` table instead. Verified 1:1 against every
// series carrying an overwear.param entry. Not all Layered sets are flagged is_collabo, so
// this check catches official ones (e.g. Harp Crown, Azure) that the collab filter misses.
function isLayeredOrStatless(armorData, seriesId) {
  const pieces = armorData.armor.param.filter(p => p.series === seriesId);
  if (pieces.length === 0) return true;
  return pieces.every(p => p.def_val === 0 && p.skill_list.every(sk => sk === 'None'));
}

/**
 * Builds the rank-tabbed armor series list for the equipment picker: { Lower, Upper, Master },
 * each an array of { id, name, rarity, collab } sorted by rarity ascending then unlock order,
 * with the known name/stat-table misalignment corrected. Collab sets are included alongside
 * regular ones (grouped by their normal rank, not separated out) as long as they have real
 * stats; unnamed and Layered Armor series (cosmetic-only, no gameplay stats) are always dropped.
 * @param {Object} armorData - Full raw armor JSON data
 * @return {{Lower: Array, Upper: Array, Master: Array}}
 */
export function getArmorSeriesList(armorData) {
  if (!armorData) return { Lower: [], Upper: [], Master: [] };

  const rarityBySeries = {};
  armorData.armor.param.forEach(p => { rarityBySeries[p.series] = p.rare; });

  const rawSeries = armorData.armor_series.param.filter(s =>
    !(s.armor_series === 0 && s.index === 0 && s.overwear_sort_index === 0)
  );

  let rows = rawSeries.map(s => {
    const id = s.armor_series;
    const piece = anyArmorPieceName(armorData, id);
    return {
      id,
      name: armorSeriesName(armorData, id),
      group: s.difficulty_group,
      index: s.index,
      collab: s.is_collabo,
      rarity: rarityBySeries[id] != null ? rarityBySeries[id] : null,
      headPieceName: piece ? piece.name : null,
    };
  });

  rows.forEach(r => {
    if (ARMOR_CONFIRMED_CORRECT.has(r.id)) return;
    if (!r.name || !armorNameRelatesToPiece(r.name, r.headPieceName)) {
      const candidate = armorSeriesName(armorData, r.id + 2);
      if (candidate && armorNameRelatesToPiece(candidate, r.headPieceName)) {
        r.name = candidate;
      } else if (!r.name) {
        r.name = null;
      }
    }
  });

  // Collab sets are kept (mixed into their normal Lower/Upper/Master group by difficulty_group,
  // same as any other set) as long as they carry real stats — only unnamed and Layered Armor
  // (cosmetic-only) series are dropped.
  rows = rows.filter(r => r.name && !isLayeredOrStatless(armorData, r.id));

  const groups = { Lower: [], Upper: [], Master: [] };
  rows.forEach(r => { if (groups[r.group]) groups[r.group].push(r); });
  const rarityKey = r => (r.rarity != null ? r.rarity : Infinity);
  Object.keys(groups).forEach(g => groups[g].sort((a, b) => (rarityKey(a) - rarityKey(b)) || (a.index - b.index)));
  return groups;
}

/**
 * Returns the up-to-5 armor.param entries (Head/Chest/Arm/Waist/Leg) belonging to one
 * armor_series id, each carrying its own pl_armor_id — the id actually used to equip a piece.
 * @param {Object} armorData - Full raw armor JSON data
 * @param {number} seriesId - armor_series id
 * @return {Array} armor.param entries for that series
 */
export function getArmorSeriesPieces(armorData, seriesId) {
  return armorData ? armorData.armor.param.filter(p => p.series === seriesId) : [];
}

/**
 * Icon path for one armor piece slot at a given rarity, using the generic rarity-based icon
 * set (not a per-set unique icon).
 * @param {"Head"|"Chest"|"Arm"|"Waist"|"Leg"} type
 * @param {number} rarity
 * @return {string}
 */
export function getArmorPieceIconURL(type, rarity) {
  const fileType = ARMOR_ICON_FILE_TYPES[type];
  return `icons/MH-Icons/Armor/${fileType}-Rarity-${rarity || 1}.svg`;
}

export function isValidJSON(jsonString) {
  try {
      JSON.parse(jsonString);
      return true;
  } catch (error) {
      return false;
  }
}
