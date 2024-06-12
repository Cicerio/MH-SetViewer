import { useState } from "react";
// import weaponData from "https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/df23cfb8220c1ec8ff707b0d0517924a0356beca/mhrice_charge-axe.json";
import weaponData from '../../mhrice-charge_axe-data.json'
import '../css/WeaponBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getWeaponIconURL } from "../helpers/helpers";


export default function WeaponBlock({onClick, ...props}) {
  /**
   * Id/Name style:
   * W_ChargeAxe_{ID}_{Name, Explain}
   */
  return (
    <>
      <div className="gearItem-container" onClick={onClick}>
        <div className="item-container">
          <div className="slot-icon">
            <img alt="slot icon" src={getWeaponIconURL(props.weapType, 1)}></img>
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
