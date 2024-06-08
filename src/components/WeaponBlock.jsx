import { useState } from "react";
// import weaponData from "https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/df23cfb8220c1ec8ff707b0d0517924a0356beca/mhrice_charge-axe.json";
import weaponData from '../../mhrice-charge_axe-data.json'
import '../css/WeaponBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function getWeaponIcon(type) {
  switch (type) {
    case 1:
      return "icons/MH-Icons/Weapons/Greatsword-Rarity-1.png";
    case 2:

    case 3:

    case 4:

    case 5:

    case 6:

    case 7:

    case 8:

    case 9:

    case 10: // Charge Blade
      return "../../icons/MH-Icons/Weapons/ChargeBlade-Rarity-1.svg"
    case 11:

    case 12:

    case 13:

    case 14:

  }
}
export default function WeaponBlock(props) {
  /**
   * Id/Name style:
   * W_ChargeAxe_{ID}_{Name, Explain}
   */
  return (
    <>
      <div className="gearItem-container">
        <div className="item-container">
          <div className="slot-icon">
            <img alt="slot icon" src={getWeaponIcon(props.weapType)}></img>
          </div>
          {props.name && (
            <div className="selected-item">
              {props.name}
            </div>
          )}
          <button className="info-button" aria-label="info">
            <FontAwesomeIcon icon={faGripLinesVertical} />
          </button>
          <button className="clear-button" aria-label="clear">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}
