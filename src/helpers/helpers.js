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
export function getWeaponIconURL(type, rarity) {
  switch (type) {
    case 1:
      return "icons/MH-Icons/Weapons/Greatsword-Rarity-"+rarity+".png";
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
      return armorData
        ? armorData.armor_series_name_msg.entries.find(obj => 
          obj.name === "ArmorSeries_Hunter_" + convertToThreeDigits(armorID))?.content[1]
        : "unfound";
  }
}
export function getArmorBaseData(){

}