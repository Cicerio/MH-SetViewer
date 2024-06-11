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
  const [armorData, setArmorData] = useState(null);
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  const [weaponID, setWeaponID] = useState(null);
  const [weaponName, setWeaponName] = useState('');
  const [weaponType, setWeaponType] = useState(10);
  const [armorIDs, setArmorIDs] = useState([null, null, null, null, null]);


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
    setWeaponID(56);
    setBaseWeaponData(weaponData ?
      weaponData.charge_axe.base_data.param.find(obj => obj.base.base.base.base.id.ChargeAxe === weaponID) : null);
    setWeaponName(weaponData ?
      weaponData.charge_axe.name.entries.find(obj => obj.name === 'W_ChargeAxe_' + convertToThreeDigits(weaponID) + '_Name')?.content[1] : null);
  }, [weaponData, weaponID]);
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
  const handleEquipTypeChange = (event) => {
    const selectedOption = event.target.value;
    setEquipOpenType(selectedOption);
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
          <ArmorBlock armorType={"head"} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"chest"} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"arms"} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"waist"} onClick={toggleEquipWindowState}></ArmorBlock>
          <ArmorBlock armorType={"legs"} onClick={toggleEquipWindowState}></ArmorBlock>
        </section>
      )}
      <section className='stats-container'>
        {(isStatsSelected || isEverythingSelected) && (
          <div className='equipped-stats' >
            {/* maybe have these blocks be their own components */}

            <div>
              <ul className='attack-stats striped'>
                <li>Attack (Raw): {baseWeaponData ? baseWeaponData.base.base.base.atk : "N/A"}</li>
                <li>Affinity: {baseWeaponData ? baseWeaponData.base.base.base.critical_rate +"\%": 0 + "\%"}</li>
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
          <SelectionGrid type="weapon" data={weaponData}></SelectionGrid>
        </div>
      </PopupWindow>
      {/* Equipment tab popup */}
      <PopupWindow isOpen={isEquipWindowOpen} setIsOpen={setIsEquipWindowOpen} windowHeader={"Select your equipment!"}>
        <div className='equip-window'>
          <SelectionGrid type="equipment" data={armorData}></SelectionGrid>
        </div>
      </PopupWindow>
    </main>
  );
}
