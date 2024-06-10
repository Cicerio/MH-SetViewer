import './css/builderApp.css'
import React, { useState, useRef, useEffect } from 'react';

import ClickOutsideWrapper from './components/ClickOutsideWrapper';
import WeaponBlock from './components/WeaponBlock';
import ArmorBlock from './components/ArmorBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

export default function BuilderApp() {
  // States dealing with DOM/tabs
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSaveWindowOpen, setIsSaveWindowOpen] = useState(false);
  const saveWindowRef = useRef(null);

  // States dealing with data
  const [weaponData, setWeaponData] = useState(null);
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  const [weaponID, setWeaponID] = useState(null);
  const [weaponName, setWeaponName] = useState('');
  const [weaponType, setWeaponType] = useState(1);


  useEffect(() => { //  Loading JSON weapon data
    const fetchData = async () => { // fetching weapon data
      try {
        const response = await fetch('https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/1fa7d2f49cc499c9bd8569f0cff44b5435de359b/mhrice_charge-axe.json');
        const jsonData = await response.json();
        setWeaponData(jsonData);
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
    setWeaponID("001");
    setBaseWeaponData(weaponData ?
      weaponData.charge_axe.base_data.param.find(obj => obj.base.base.base.base.id.ChargeAxe === weaponID) : null);
    setWeaponName(weaponData ?
      weaponData.charge_axe.name.entries.find(obj => obj.name === 'W_ChargeAxe_' + weaponID + '_Name')?.content[1] : null);
    // Rest of your code...
  }, [weaponData, weaponID]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };
  /**
   * Sets Save Window shown/hidden state
   */
  const toggleSaveState = () => {
    setIsSaveWindowOpen(!isSaveWindowOpen);
  }

  const isEquipmentSelected = selectedTab === 0;
  const isStatsSelected = selectedTab === 1;
  const isSkillsSelected = selectedTab === 2;
  const isEverythingSelected = selectedTab === -1;

  if (!weaponData) {
    return <div>Loading...</div>;
  }
  console.log("Is the save window open: " + isSaveWindowOpen)
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
          onClick={() => toggleSaveState()}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </div>
      </div>
      {(isEquipmentSelected || isEverythingSelected) && (
        <section className='gear-container'>
          <WeaponBlock weapType={weaponType} name={weaponName} ></WeaponBlock>
          <ArmorBlock armorType={"head"}></ArmorBlock>
          <ArmorBlock armorType={"chest"}></ArmorBlock>
          <ArmorBlock armorType={"arms"}></ArmorBlock>
          <ArmorBlock armorType={"waist"}></ArmorBlock>
          <ArmorBlock armorType={"legs"}></ArmorBlock>
        </section>
      )}
      <section className='stats-container'>
        {(isStatsSelected || isEverythingSelected) && (
          <div className='equipped-stats' >
            {/* maybe have these blocks be their own components */}
            <h4>Attack</h4>
            <div>
              <ul className='attack-stats striped'>
                <li>Attack : {baseWeaponData ? baseWeaponData.base.base.base.atk : "N/A"}</li>
                <li> oh oh me too</li>
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
      <ClickOutsideWrapper isOpen={isSaveWindowOpen} setIsOpen={setIsSaveWindowOpen}>
        <div 
          className='save-window'>
          Save some stuff?
        </div>
      </ClickOutsideWrapper>
    </main>
  );
}
