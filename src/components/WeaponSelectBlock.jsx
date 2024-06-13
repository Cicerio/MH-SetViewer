import { useEffect, useState } from 'react';
import '../css/WeaponSelectBlock.css'
import { getWeaponBaseData, getWeaponName } from '../helpers/helpers';

export default function WeaponSelectBlock({ weaponID, onClick, data }) {
  const [weaponName, setWeaponName] = useState("");
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  const [sharpnessValues, setSharpnessValues] = useState([10, 20, 30, 40]);
  
  useEffect(() => { // to handle data
    setBaseWeaponData(getWeaponBaseData(data, weaponID));
    setWeaponName(getWeaponName(data, weaponID));
  }, []);
  useEffect(() => { // handle baseWeaponData stats
    setSharpnessValues(
      baseWeaponData ? baseWeaponData.base.sharpness_val_list : [1, 1, 1, 1, 1, 1, 1]
    );
  }, [baseWeaponData])
  if(!baseWeaponData){
    console.log("Attempting to load data...")
    return <div>Loading...</div>
  }
  return (
    <div className="weaponSelect-block" onClick={() => onClick(weaponID)}>
      <div className='weaponSelect-header'>
      <span>{weaponName}</span>
      <span>Rarity {baseWeaponData.base.base.base.base.rare_type}</span>
      </div>
      <div className="weaponSelect-stats">
        <div className='weaponSelect-stat'>
          <span>Attack: </span>
          <span>{baseWeaponData ? baseWeaponData.base.base.base.atk : "N/A"}</span>
        </div>
        <div className='weaponSelect-stat'>
          <span>Affinity: </span>
          <span>{baseWeaponData ? baseWeaponData.base.base.base.critical_rate : 0}%</span>
        </div>
        <div className='weaponSelect-stat'>
          <span>Defense Bonus: </span>
          <span>{baseWeaponData ? baseWeaponData.base.base.base.def_bonus : 0}</span>
        </div>
      </div>
      <div className="weaponSelect-sharpness ">
        <span>Sharpness: </span>
        <div className='sharpness-bar'>
          {sharpnessValues.map((number, index) => (
            <span key={index} className={`sharp-val-${index + 1}`} style={{ width: `${number * 0.5}px` }}>
            </span>
          ))}
        </div>
      </div>
      <div className="weaponSelect-stats">
        <div className='weaponSelect-stat'>
          <span>Phial type: </span>
          <span>{baseWeaponData ? baseWeaponData.charge_axe_bottle_type : "N/A"}</span>
        </div>
        {baseWeaponData.base.base.main_element_type !== "None" && <div className='weaponSelect-stat'>
          <span>Element: </span>
          <span>{baseWeaponData ? baseWeaponData.base.base.base.atk : "N/A"}</span>
        </div>}
        <div className='weaponSelect-stat'>
          <span>Decorations: </span>
          <span>
            {baseWeaponData ? baseWeaponData.base.base.base.slot_num_list[0]: "-"} 
            {baseWeaponData ? baseWeaponData.base.base.base.slot_num_list[1]: "-"} 
            {baseWeaponData ? baseWeaponData.base.base.base.slot_num_list[2]: "-"} 
            {baseWeaponData ? baseWeaponData.base.base.base.slot_num_list[3]: "-"}
          </span>
        </div>

      </div>
    </div>
  );
}