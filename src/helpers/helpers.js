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
      return ("icons/MH-Icons/Weapons/ChargeBlade-Rarity-"
        + rarity +
        (rarity !== 1 ? ".png" : ".svg"));
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
      return "/icons/filter-svgrepo-com.svg";
  }
}
