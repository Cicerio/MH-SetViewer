import { useState } from "react";
// import weaponData from "https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/df23cfb8220c1ec8ff707b0d0517924a0356beca/mhrice_charge-axe.json";
import weaponData from '../../mhrice-charge_axe-data.json'
import '../css/styles.css'
function WeaponBlock() {
  let jsonStructure = {
    'W_ChargeAxe_000': {
      weaponID: '08B00000',
      enumName: 'W_ChargeAxe_000',
      modelID: '08B00004',
      modelName: 'C_Axe018',
      sortID: '59',
      weaponName: 'Hyperguard I'
    }
  };
  let chargeAxeRef = true ? 0 : 1;

  let sortIDNum = 1

  return (
    <>
      <div className="equipWeap">
        <div className="icon"></div>
        <div className="stats">
          <div className="name"></div>
          <div className="weapon-stats">
            <div className="stat-attack">
              <img src="icons/Stats/attack.png" alt="atkIcon"></img>
              <div className="attack-num"></div>
            </div>
            <div className="stat-affinity">
              <img src="icons/Stats/affinity.png" alt="affIcon"></img>
              <div className="affinity-num"></div>
            </div>
            <div className="stat-element">
              <div className="element-num"></div>
            </div>
          </div>
        </div>
        <div className="decos">
        </div>
      </div>
    </>
  );
}

export default WeaponBlock;