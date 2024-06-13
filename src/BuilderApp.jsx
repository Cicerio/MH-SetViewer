import './css/builderApp.css';
import React, { useState, useEffect } from 'react';
import { convertToThreeDigits, getWeaponName, getWeaponBaseData, getIconURL, getEquipmentBaseData, getTrueRawAttack, isValidJSON }
  from './helpers/helpers';

import InfoTab from './components/InfoTab';
import PopupWindow from './components/PopupWindow';
import WeaponBlock from './components/WeaponBlock';
import ArmorBlock from './components/ArmorBlock';
import SelectionGrid from './components/SelectionGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

export default function BuilderApp() {
  // Any state that has an intial value rerenders the page once.
  // States dealing with DOM/tabs
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSaveWindowOpen, setIsSaveWindowOpen] = useState(false);
  const [isWeaponWindowOpen, setIsWeaponWindowOpen] = useState(false);
  const [isEquipWindowOpen, setIsEquipWindowOpen] = useState(false);
  const [showSaveCodeToast, setShowSaveCodeToast] = useState(false);
  const [showLoadCodeToast, setShowLoadCodeToast] = useState(false);
  const [showLoadErrorToast, setShowLoadErrorToast] = useState(false);
  // States dealing with data
  const [weaponData, setWeaponData] = useState(null);
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  const [weaponID, setWeaponID] = useState(null);
  const [weaponName, setWeaponName] = useState('');
  const [weaponType, setWeaponType] = useState(10);
  const [weaponBaseStats, setWeaponBaseStats] = useState({
    rarity: null,
    atk: null,
    aff: null,
    element_type: null,
    element_value: null,
    def_bonus: null,
    sharpness_block: null,
  })

  const [armorData, setArmorData] = useState(null);
  const [armorIDs, setArmorIDs] = useState([null, null, null, null, null]);
  const [prevArmorIDs, setPrevArmorIDs] = useState([null, null, null, null, null]);
  const [armorNames, setArmorNames] = useState(['', '', '', '', ''])
  const [armorDefenses, setArmorDefenses] = useState([
    {
      raw: null,
      fire: null,
      water: null,
      thunder: null,
      ice: null,
      dragon: null,
    },
    {
      raw: null,
      fire: null,
      water: null,
      thunder: null,
      ice: null,
      dragon: null,
    },
    {
      raw: null,
      fire: null,
      water: null,
      thunder: null,
      ice: null,
      dragon: null,
    },
    {
      raw: null,
      fire: null,
      water: null,
      thunder: null,
      ice: null,
      dragon: null,
    },
    {
      raw: null,
      fire: null,
      water: null,
      thunder: null,
      ice: null,
      dragon: null,
    }
  ]);
  const [totalDefenses, setTotalDefenses] = useState({
    raw: null,
    fire: null,
    water: null,
    thunder: null,
    ice: null,
    dragon: null,
  })

  const [jsonCode, setJsonCode] = useState(null);
  useEffect(() => { //  Loading raw JSON data
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
    if (weaponData, weaponID) {
      setBaseWeaponData(getWeaponBaseData(weaponData, weaponID));
      setWeaponName(getWeaponName(weaponData, weaponID));
      handleWeaponStatChange(weaponData, weaponID);
    }
  }, [weaponData, weaponID]);

  useEffect(() => { // handle armorID change
    const armorTypeRefs = [
      "armor_head_name_msg",
      "armor_chest_name_msg",
      "armor_arm_name_msg",
      "armor_waist_name_msg",
      "armor_leg_name_msg"]
    const armorTypes = ["Head", "Chest", "Arm", "Waist", "Leg"];
    //Changes names
    // maps the ids to the names, and creates a new armorName array
    let newArmorNames = armorIDs.map((element, index) => {
      if (element !== null) {
        const nameID = convertToThreeDigits(element);
        const nameData = armorData[armorTypeRefs[index]];
        let armorName = nameData ? nameData.entries.find(obj => obj.name === 'A_' + [armorTypes[index]] + '_' + nameID + '_Name')?.content[1] : "unfound";
        return armorName
      } else {
        return element;
      }
    });
    setArmorNames(newArmorNames);

    // Getting armor defenses stats
    const changedArmorIDs = armorIDs.map((id, index) => {
      if (id !== prevArmorIDs[index]) {
        return index;
      }
      return null;
    });
    console.log(changedArmorIDs);
    console.log(armorIDs);
    let newDefensesBlock = armorDefenses;
    changedArmorIDs.forEach((index) => {
      if (changedArmorIDs[index] != null) {
        console.log(`ArmorID at index ${index} has changed to ${armorIDs[index]}`);
        const armorBaseData = getEquipmentBaseData(armorData, armorIDs[index], index);
        if (armorBaseData) {
          const newDefenses = {
            raw: armorBaseData.def_val,
            fire: armorBaseData.fire_reg_val,
            water: armorBaseData.water_reg_val,
            thunder: armorBaseData.thunder_reg_val,
            ice: armorBaseData.ice_reg_val,
            dragon: armorBaseData.dragon_reg_val,
          }
          newDefensesBlock[index] = newDefenses;
        }
      }
    });
    setArmorDefenses(newDefensesBlock);
    if (newDefensesBlock) {
      const compressedDefenses = newDefensesBlock.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          acc[key] = (acc[key] || 0) + obj[key];
        });
        return acc;
      }, {});
      console.log(compressedDefenses)
      setTotalDefenses(compressedDefenses)
    }
    console.log("ArmorIDs changed!")
  }, [armorIDs]);

  useEffect(() => {
    const jsonValue = JSON.stringify({ weaponID, armorIDs });
    setJsonCode(jsonValue);
  }, [weaponID, armorIDs]);

  useEffect(() => {
    const copyButton = document.getElementById('copyButton');
    const saveButton = document.getElementById('saveButton');
    const jsonDisplay = document.getElementById('jsonDisplay');
    const jsonInput = document.getElementById('jsonInput');


    if (copyButton && saveButton && jsonDisplay && jsonInput) {
      const copyJSON = () => {
        const text = jsonDisplay.value;
        navigator.clipboard.writeText(text)
          .then(() => {
            // Copy successful
            handleSaveButtonClick();
            console.log('JSON copied to clipboard');
          })
          .catch((error) => {
            // Copy failed
            console.error('Failed to copy JSON to clipboard', error);
          });
      };

      const saveJSON = () => {
        const text = jsonInput.value;
        if(isValidJSON(text)){
          setJsonCode(text);
          handleLoadButtonClick();
        }else{
          console.error("Error: Trying to load Invalid JSON code!")
          handleLoadError();
        }
      };

      copyButton.addEventListener('click', copyJSON);
      saveButton.addEventListener('click', saveJSON);

      return () => {
        copyButton.removeEventListener('click', copyJSON);
        saveButton.removeEventListener('click', saveJSON);
      };
    }
  }, [isSaveWindowOpen]);
  useEffect(() => {
    if (jsonCode) {
      try {
        const jsonObject = JSON.parse(jsonCode);
        console.log(jsonObject);
        setWeaponID(jsonObject.weaponID);
        setArmorIDs(jsonObject.armorIDs);
        console.log(jsonObject.armorIDs);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        // setJsonCode({
        //   weaponID:weaponID,
        //   armorIDs:armorIDs})
      }
    }
  }, [jsonCode])
  // useEffect(() => { // FOR TESTING ONLY
  //   console.log("Save Window State: " + isSaveWindowOpen +
  //     ", \n Weapon Window State: " + isWeaponWindowOpen +
  //     ", \n  Equip Window State: " + isEquipWindowOpen)

  // }, [isSaveWindowOpen, isWeaponWindowOpen, isEquipWindowOpen])
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };
  const handleSaveButtonClick = () => {
    setShowSaveCodeToast(true);
    setTimeout(() => {
      setShowSaveCodeToast(false);
    }, 3000);
  };

  const handleLoadButtonClick = () => {
    setShowLoadCodeToast(true);
    setTimeout(() => {
      setShowLoadCodeToast(false);
    }, 3000);
  };
  const handleLoadError = () => {
    setShowLoadErrorToast(true);
    setTimeout(() => {
      setShowLoadErrorToast(false);
    }, 3000);
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
    console.log("Setting weapon ID to: " + id);
    toggleWeaponWindowState();
  }
  const handleEquipmentClick = (id, type) => {
    let newArmorIDs = armorIDs.map((element, index) => {
      if (index === type) {
        return id;
      } else {
        return element;
      }
    })
    console.log("ARMOR BEING SET TO: " + id);
    console.log("TYPE OF ARMOR: " + type);
    console.log(armorIDs);
    console.log(newArmorIDs);

    setPrevArmorIDs(armorIDs);
    setArmorIDs(newArmorIDs);
    // to close window after selection
    toggleEquipWindowState();
  }

  const handleWeaponStatChange = (weaponData, weaponID) => {
    let baseWeaponData = getWeaponBaseData(weaponData, weaponID);
    if (baseWeaponData) {
      let newBaseWeaponData = {
        id: baseWeaponData.base.base.base.base.id.ChargeAxe,
        rarity: baseWeaponData.base.base.base.base.rare_type,
        atk: baseWeaponData.base.base.base.atk,
        aff: baseWeaponData.base.base.base.critical_rate,
        def_bonus: baseWeaponData.base.base.base.def_bonus,
        element_type: baseWeaponData.base.base.main_element_type,
        element_value: baseWeaponData.base.base.main_element_val,
        sharpness_block: baseWeaponData.base.sharpness_val_list,
      }
      setWeaponBaseStats(newBaseWeaponData);
    }
  }

  const handleCloseButton = (type, equipType = -1) => {
    // console.log("handleCloseButton was called!");
    switch (type) {
      case 1:
        console.log("clear weapon");
        setWeaponID(-1);
        break;
      case 2:
        console.log("clear equipment");
        switch (equipType) {
          case equipType <= 0, equipType >= 4:
            console.log("No Equipment type selected");
            break;
          default:
            const newClearedArmorIDs = armorIDs.map((element, i) => {
              if (i === equipType) {
                return null;
              }
              return element;
            });
            console.log("Armor ID to clear: " + equipType +
              "\n Armor cleared to: " + newClearedArmorIDs[equipType])
            setArmorIDs(newClearedArmorIDs);
            break;
        }
        break;
      default:
        console.error("Error, wrong type for parameter 'type'")
        break;
    }
  }

  const handleInfoButton = (type, equipType = -1) => {
    // console.log("handleCloseButton was called!");
    switch (type) {
      case 1:
        console.log("weapon info called;");
        break;
      case 2:
        // console.log("equipment info called;");
        switch (equipType) {
          case equipType <= 0, equipType >= 4:
            console.log("No Equipment type selected");
            break;
          default:
            console.log("Equipment info of type: " + equipType + " called;")
            break;
        }
        break;
      default:
        console.error("Error, wrong type for parameter 'type'")
        break;
    }
  }

  const addRandomBuild = () => {
    setWeaponID(68);
    const randomArmorIDs = [1, 2, 3, 4, 5]
    setArmorIDs(randomArmorIDs);
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
          <WeaponBlock onClick={toggleWeaponWindowState} weapType={weaponType} name={weaponName}
            onClose={() => handleCloseButton(1)} onInfo={() => handleInfoButton(1)} />
          <ArmorBlock armorType={"head"} name={armorNames[0]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 0)} onInfo={() => handleInfoButton(2, 0)} />
          <ArmorBlock armorType={"chest"} name={armorNames[1]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 1)} onInfo={() => handleInfoButton(2, 1)} />
          <ArmorBlock armorType={"arms"} name={armorNames[2]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 2)} onInfo={() => handleInfoButton(2, 2)} />
          <ArmorBlock armorType={"waist"} name={armorNames[3]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 3)} onInfo={() => handleInfoButton(2, 3)} />
          <ArmorBlock armorType={"legs"} name={armorNames[4]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 4)} onInfo={() => handleInfoButton(2, 4)} />
        </section>
      )}
      <section className='stats-container'>
        {(isStatsSelected || isEverythingSelected) && (
          <div className='equipped-stats' >
            {/* maybe have these blocks be their own components */}
            <InfoTab header='Attack Stats'>
              <ul className='attack-stats striped'>
                <li>
                  <span>Attack (Raw)</span>
                  <span>{weaponBaseStats.atk ? weaponBaseStats.atk : "NaN"}</span>
                </li>
                <li>
                  <span>Affinity</span>
                  <span>{weaponBaseStats.aff ? weaponBaseStats.aff + "\%" : "0\%"}</span>
                </li>
                <li>
                  <span>Critical Damage Boost</span>
                  <span>125%</span>
                </li>
                {weaponBaseStats.element_type && weaponBaseStats.element_type !== "None" &&
                  <li>
                    <span>{weaponBaseStats.element_type}</span>
                    <span>{weaponBaseStats.element_value}</span>
                  </li>
                }
                <li>
                  <span>True Raw</span>
                  <span>{getTrueRawAttack(weaponBaseStats.atk, weaponBaseStats.sharpness_block)}</span>
                </li>
                <li>
                  <span>Sharpness</span>
                  <div className='sharpness-bar sharpness-statgrid'>
                    {weaponBaseStats.sharpness_block && (<>
                      <img src={getIconURL("swordhilt")} alt="Sword hilt" className='swordhilt' />
                      {weaponBaseStats.sharpness_block.map((number, index) => (
                        <span key={index} className={`sharp-val-${index + 1}`} style={{ width: `${number * 0.75}px` }}>
                        </span>
                      ))}
                    </>
                    )}
                  </div>
                </li>

              </ul>
            </InfoTab>
            <InfoTab header='Defense'>
              <ul className='defense-stats striped'>
                <li>
                  <span>Defense</span>
                  <span>{(weaponBaseStats.def_bonus ? (weaponBaseStats.def_bonus + totalDefenses.raw) : totalDefenses.raw)
                    + 0}</span>
                </li>
                <li className='element-defenses'>
                  <ul className='striped'>
                    <li>
                      <span>Fire Resist</span>
                      <span>{totalDefenses.fire}</span>
                    </li>
                    <li>
                      <span>Water Resist</span>
                      <span>{totalDefenses.water}</span>
                    </li>
                    <li>
                      <span>Thunder Resist</span>
                      <span>{totalDefenses.thunder}</span>
                    </li>
                    <li>
                      <span>Ice Resist</span>
                      <span>{totalDefenses.ice}</span>
                    </li>
                    <li>
                      <span>Dragon Resist</span>
                      <span>{totalDefenses.dragon}</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Health </span>
                  <span>100 (150)</span>
                </li>
                <li>
                  <span>Stamina</span>
                  <span>100 (150)</span>
                </li>
              </ul>
            </InfoTab>
          </div>
        )}
        {(isSkillsSelected || isEverythingSelected) && (
          <section className='skills-container'>
            <div className='equipped-skills' >
              <br />
              <h4>
                Skills - Not yet implemented
              </h4>
            </div>
          </section>
        )}
        {/* <button onClick={() => addRandomBuild()}>Click here to add a random build!</button> */}
      </section>
      {/* Save tab popup */}
      <PopupWindow isOpen={isSaveWindowOpen} setIsOpen={setIsSaveWindowOpen} windowHeader={"Save / Load"}>
        <div
          className='save-window'>
          <hr />
          <div className='save-box'>
            <span>Current build code:</span>
            <p id='save-subtitle'>Save this, it will be cleared on page reload!</p>
            <textarea id="jsonDisplay" className='save-inputs ' value={jsonCode} readOnly />
            <br />
            <button id="copyButton" className='save-buttons '>Copy code</button>
            {showSaveCodeToast && <span className='event-toast'>Code copied to clipboard!</span>}
            <p></p>
          </div>
          <hr/>
          <div className='save-box'>
            <span>Paste saved build code here:</span>
            <p id='save-subtitle'>A fantastic build awaits, with just one Ctrl/CMD-V!</p>
            <textarea id="jsonInput" className='save-inputs ' placeholder="Paste your JSON code here" />
            <br />
            <button id="saveButton" className='save-buttons '>Paste build</button>
            {showLoadCodeToast && <span className='event-toast'>Build code loaded successfully!</span>}
            {showLoadErrorToast && <span className='error-toast'>Error: Invalid JSON format!</span>}
          </div>
          <hr/>
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
