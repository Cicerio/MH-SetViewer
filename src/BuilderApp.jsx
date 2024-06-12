import './css/builderApp.css';
import React, { useState, useEffect, useCallback } from 'react';

import PopupWindow from './components/PopupWindow';
import WeaponBlock from './components/WeaponBlock';
import ArmorBlock from './components/ArmorBlock';
import BasicSelect from './components/BasicSelect';
import SelectionGrid from './components/SelectionGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

// helper functions
function convertToThreeDigits(number) {
  return number.toString().padStart(3, '0');
}
export default function BuilderApp() {
  // Any state that has an intial value rerenders the page once.
  // States dealing with DOM/tabs
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSaveWindowOpen, setIsSaveWindowOpen] = useState(false);
  const [isWeaponWindowOpen, setIsWeaponWindowOpen] = useState(false);
  const [isEquipWindowOpen, setIsEquipWindowOpen] = useState(false);
  // States dealing with data
  const [weaponData, setWeaponData] = useState(null);
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  const [weaponID, setWeaponID] = useState(0);
  const [weaponName, setWeaponName] = useState('');
  const [weaponType, setWeaponType] = useState(10);

  const [armorData, setArmorData] = useState(null);
  const [armorIDs, setArmorIDs] = useState([null, null, null, null, null]);
  const [armorNames, setArmorNames] = useState(['', '', '', '', ''])

  useEffect(() => { //  Loading JSON data
    const fetchData = async () => { // fetching armor and weapon data
      try {
        const response = await fetch('https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/1fa7d2f49cc499c9bd8569f0cff44b5435de359b/mhrice_charge-axe.json');
        const jsonData = await response.json();
        setWeaponData(jsonData);
        const responseArmor = await fetch('https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/01477e873b9de749fea6268482c5b2ba82676d7c/mhrice-armor-data.json');
        const jsonDataArmor = await responseArmor.json();
        setArmorData(jsonDataArmor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => { //for handling selected tabs
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setSelectedTab(-1);
      } else {
        setSelectedTab(0);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => { // to handle weaponID change
    setBaseWeaponData(weaponData ?
      weaponData.charge_axe.base_data.param.find(obj => obj.base.base.base.base.id.ChargeAxe === weaponID) : null);
    setWeaponName(weaponData ?
      weaponData.charge_axe.name.entries.find(obj => obj.name === 'W_ChargeAxe_' + convertToThreeDigits(weaponID) + '_Name')?.content[1] : null);
  }, [weaponData, weaponID]);

  useEffect(() => { // handle armorID change
    const armorTypeRefs = [
      "armor_head_name_msg",
      "armor_chest_name_msg",
      "armor_arm_name_msg",
      "armor_waist_name_msg",
      "armor_leg_name_msg"]
    const armorTypes = ["Head", "Chest", "Arm", "Waist", "Leg"];
    // maps the ids to the names, and creates a new armorName array
    let newArmorNames = armorIDs.map((element, index) => {
      if (element !== null) {
        const nameID = convertToThreeDigits(element);
        console.log(nameID);
        const nameData = armorData[armorTypeRefs[index]];
        console.log(nameData);
        let armorName = nameData ? nameData.entries.find(obj => obj.name === 'A_' + [armorTypes[index]] + '_' + nameID + '_Name')?.content[1] : "unfound";
        console.log(armorName);
        return armorName
      } else {
        console.log("There's no element? " + element)
        return element;
      }
    });

    setArmorNames(newArmorNames);
    console.log("New armor names: " + newArmorNames);
    console.log(armorIDs);
  }, [armorIDs]);

  useEffect(() => { // FOR TESTING ONLY
    console.log("Save Window State: " + isSaveWindowOpen +
      ", \n Weapon Window State: " + isWeaponWindowOpen +
      ", \n  Equip Window State: " + isEquipWindowOpen)

  }, [isSaveWindowOpen, isWeaponWindowOpen, isEquipWindowOpen])
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };
  /**
   * Sets Save Window shown/hidden state
   */
  const toggleSaveWindowState = () => {
    setIsSaveWindowOpen(!isSaveWindowOpen);
  }
  const toggleWeaponWindowState = () => {
    setIsWeaponWindowOpen(!isWeaponWindowOpen);
  }

  const toggleEquipWindowState = () => {
    setIsEquipWindowOpen(!isEquipWindowOpen);
  }
  const handleWeaponClick = (id) => {
    setWeaponID(id);
    console.log("Setting weapon ID to: " + id)
  }
  const handleEquipmentClick = (id, type) => {
    // setArmorIDs[type] = id;
    let newArmorIDs = armorIDs.map((element, index) => {
      if (index === type) {
        return id;
      } else {
        return element;
      }
    })
    console.log("ARMOR BEING SET TO: " + id);
    console.log("TYPE OF ARMOR: " + type);
    setArmorIDs(newArmorIDs);
  }

  const isEquipmentSelected = selectedTab === 0;
  const isStatsSelected = selectedTab === 1;
  const isSkillsSelected = selectedTab === 2;
  const isEverythingSelected = selectedTab === -1;

  if (!weaponData || !armorData) {
    return <div>Loading...</div>;
  }
  return (
    <main className='container'>
      <div className='tab-container'>
        <div
          className={`tab ${selectedTab === 0 ? 'selected' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          Equipment
        </div>
        <div
          className={`tab ${selectedTab === 1 ? 'selected' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Stats
        </div>
        <div
          className={`tab ${selectedTab === 2 ? 'selected' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Skills
        </div>
        <div
          className={'tab SaveWindow'}
          onClick={() => toggleSaveWindowState()}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </div>
      </div>
      {(isEquipmentSelected || isEverythingSelected) && (
        <section className='gear-container'>
          <WeaponBlock onClick={toggleWeaponWindowState} weapType={weaponType} name={weaponName}></WeaponBlock>
          <ArmorBlock armorType={"head"} name={armorNames[0]} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"chest"} name={armorNames[1]} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"arms"} name={armorNames[2]} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"waist"} name={armorNames[3]} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"legs"} name={armorNames[4]} onClick={toggleEquipWindowState}></ArmorBlock>
        </section>
      )}
      <section className='stats-container'>
        {(isStatsSelected || isEverythingSelected) && (
          <div className='equipped-stats' >
            {/* maybe have these blocks be their own components */}

            <div>
              <ul className='attack-stats striped'>
                <li>Attack (Raw): {baseWeaponData ? baseWeaponData.base.base.base.atk : "N/A"}</li>
                <li>Affinity: {baseWeaponData ? baseWeaponData.base.base.base.critical_rate + "\%" : 0 + "\%"}</li>
                {baseWeaponData.base.base.main_element_type !== "None" &&
                  <li>{baseWeaponData.base.base.main_element_type} : {baseWeaponData.base.base.main_element_val}</li>
                }
              </ul>
            </div>
            <br />
            <h4>Defense</h4>
            <div></div>
            <br />
          </div>
        )}
        {(isSkillsSelected || isEverythingSelected) && (
          <section className='skills-container'>
            <div className='equipped-skills' >
              <br />
              <h4>
                Skills
              </h4>
            </div>
          </section>
        )}
      </section>
      {/* Save tab popup */}
      <PopupWindow isOpen={isSaveWindowOpen} setIsOpen={setIsSaveWindowOpen} windowHeader={"Save Tab"}>
        <div
          className='save-window'>
          Save some stuff?
        </div>
      </PopupWindow>
      {/* Weapon tab popup */}
      <PopupWindow isOpen={isWeaponWindowOpen} setIsOpen={setIsWeaponWindowOpen} windowHeader={"Select Weapon"}>
        <div className='weapon-window'>
          <SelectionGrid type="weapon" data={weaponData} onClick={handleWeaponClick}></SelectionGrid>
        </div>
      </PopupWindow>
      {/* Equipment tab popup */}
      <PopupWindow isOpen={isEquipWindowOpen} setIsOpen={setIsEquipWindowOpen} windowHeader={"Select your equipment!"}>
        <div className='equip-window'>
          <SelectionGrid type="equipment" data={armorData} onClick={handleEquipmentClick}></SelectionGrid>
        </div>
      </PopupWindow>
    </main>
  );
}
