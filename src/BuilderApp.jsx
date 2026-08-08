import './css/builderApp.css';
import React, { useState, useEffect } from 'react';
import { convertToThreeDigits, getWeaponName, getWeaponBaseData, getIconURL, getEquipmentBaseData, getTrueRawAttack, isValidJSON }
  from './helpers/helpers';

import InfoTab from './components/InfoTab';
import PopupWindow from './components/PopupWindow';
import WeaponBlock from './components/WeaponBlock';
import ArmorBlock from './components/ArmorBlock';
import SelectionGrid from './components/SelectionGrid';
import ArmorPicker from './components/ArmorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

export default function BuilderApp() {
  // Any state that has an intial value rerenders the page once.
  // selectedTab: 0 = Equipment, 1 = Stats, 2 = Skills (unused), -1 = "everything" (wide/desktop layout shows all sections at once)
  // States dealing with DOM/tabs
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSaveWindowOpen, setIsSaveWindowOpen] = useState(false);
  const [isWeaponWindowOpen, setIsWeaponWindowOpen] = useState(false);
  const [isEquipWindowOpen, setIsEquipWindowOpen] = useState(false);
  // Toasts shown briefly after copying/pasting a build code (see handleSaveButtonClick/handleLoadButtonClick/handleLoadError below)
  const [showSaveCodeToast, setShowSaveCodeToast] = useState(false);
  const [showLoadCodeToast, setShowLoadCodeToast] = useState(false);
  const [showLoadErrorToast, setShowLoadErrorToast] = useState(false);
  // States dealing with data
  // weaponData/armorData: full raw JSON dumps fetched from the MHRise gists (see fetchData effect below)
  const [weaponData, setWeaponData] = useState(null);
  const [baseWeaponData, setBaseWeaponData] = useState(null);
  // weaponID: index/id of the currently selected weapon within weaponData
  const [weaponID, setWeaponID] = useState(null);
  const [weaponName, setWeaponName] = useState('');
  // weaponType: 10 = Charge Axe (this build is currently hardcoded to charge axes only, see fetchData below)
  const [weaponType, setWeaponType] = useState(10);
  // weaponBaseStats: flattened/simplified stats pulled from the selected weapon's raw data (populated by handleWeaponStatChange)
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
  // armorIDs/armorNames/armorDefenses are all parallel 5-element arrays, one slot per equipment piece: [Head, Chest, Arm, Waist, Leg]
  const [armorIDs, setArmorIDs] = useState([null, null, null, null, null]);
  // prevArmorIDs: snapshot of armorIDs before the latest change, used to figure out which slot(s) just changed (see armorIDs effect below)
  const [prevArmorIDs, setPrevArmorIDs] = useState([null, null, null, null, null]);
  const [armorNames, setArmorNames] = useState(['', '', '', '', ''])
  // per-slot rarity (1-10), used to pick which recolored icon to show for each equipped piece
  const [armorRarities, setArmorRarities] = useState([1, 1, 1, 1, 1]);
  // per-slot elemental/raw defense values, summed into totalDefenses below
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
  // totalDefenses: sum of all 5 armorDefenses slots, displayed on the Stats tab
  const [totalDefenses, setTotalDefenses] = useState({
    raw: null,
    fire: null,
    water: null,
    thunder: null,
    ice: null,
    dragon: null,
  })

  // jsonCode: the "build code" string (JSON of {weaponID, armorIDs}) shown/edited in the Save/Load popup.
  // It's kept in sync both ways: weaponID/armorIDs changes regenerate it, and pasting a new value re-parses it back into state (see effects below).
  const [jsonCode, setJsonCode] = useState(null);
  /**
   * Runs once on mount: fetches the raw weapon/armor JSON data from GitHub gists,
   * and sets up a window resize listener that switches between the mobile tab layout
   * (selectedTab 0/1/2) and the desktop "everything at once" layout (selectedTab -1).
   */
  useEffect(() => { //  Loading raw JSON data
    const fetchData = async () => { // fetching armor and weapon data
      try {
        // const response = await fetch('https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/1fa7d2f49cc499c9bd8569f0cff44b5435de359b/mhrice_charge-axe.json');
        const response = await fetch(import.meta.env.BASE_URL + 'game_data/mhrice-charge_axe-data.json');
        console.log(import.meta.env.BASE_URL + 'game_data/mhrice-charge_axe-data.json')
        const jsonData = await response.json();
        setWeaponData(jsonData);
        // const responseArmor = await fetch('https://gist.githubusercontent.com/Cicerio/f008eaeb97f4c8e6b68418b72c4a9488/raw/01477e873b9de749fea6268482c5b2ba82676d7c/mhrice-armor-data.json');
        const responseArmor = await fetch(import.meta.env.BASE_URL + 'game_data/mhrice-armor-data.json');
        
        const jsonDataArmor = await responseArmor.json();
        console.log("armorResponse: " + jsonDataArmor)
        setArmorData(jsonDataArmor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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
/**
 * Runs whenever the weapon data loads or the selected weaponID changes:
 * looks up that weapon's base data/name and recomputes weaponBaseStats.
 * Note: the `if` condition uses the comma operator, so it only actually checks weaponID != null (weaponData != null is evaluated and discarded).
 */
  useEffect(() => { // to handle weaponID change
    if (weaponData != null, weaponID != null) {
      setBaseWeaponData(getWeaponBaseData(weaponData, weaponID));
      setWeaponName(getWeaponName(weaponData, weaponID));
      handleWeaponStatChange(weaponData, weaponID);
    }
  }, [weaponData, weaponID]);

  /**
   * Runs whenever armorIDs changes: re-derives armorNames from the raw armorData for every slot,
   * then figures out which slot(s) changed (by diffing against prevArmorIDs) and refetches just
   * those slots' defense values, finally re-summing everything into totalDefenses.
   */
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
    let newRaritiesBlock = [...armorRarities];
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
          newRaritiesBlock[index] = armorBaseData.rare;
        } else {
          newRaritiesBlock[index] = 1;
        }
      }
    });
    setArmorDefenses(newDefensesBlock);
    setArmorRarities(newRaritiesBlock);
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

  // Serializes the current build (weaponID + armorIDs) into jsonCode any time either changes,
  // so the Save/Load popup's textarea always reflects the current build.
  useEffect(() => {
    const jsonValue = JSON.stringify({ weaponID, armorIDs });
    setJsonCode(jsonValue);
  }, [weaponID, armorIDs]);

  // Manually wires up the Copy/Paste buttons in the Save/Load popup via getElementById,
  // since those buttons live inside PopupWindow's DOM rather than being handled with normal
  // React onClick props. Re-runs whenever the save popup opens/closes so the listeners attach
  // once the elements actually exist in the DOM.
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
  /**
   * Runs whenever jsonCode changes: parses it back into weaponID/armorIDs.
   * This is what actually applies a pasted build code (see saveJSON above), and also
   * fires harmlessly after the effect above regenerates jsonCode from the current state.
   */
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
  /**
   * Switches the active mobile tab (Equipment/Stats/Skills).
   * @param {number} index - Tab index to select (0=Equipment, 1=Stats, 2=Skills, -1=everything)
   */
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };
  /**
   * Shows the "code copied" toast for 3 seconds.
   */
  const handleSaveButtonClick = () => {
    setShowSaveCodeToast(true);
    setTimeout(() => {
      setShowSaveCodeToast(false);
    }, 3000);
  };

  /**
   * Shows the "build loaded" toast for 3 seconds.
   */
  const handleLoadButtonClick = () => {
    setShowLoadCodeToast(true);
    setTimeout(() => {
      setShowLoadCodeToast(false);
    }, 3000);
  };
  /**
   * Shows the "invalid JSON format" error toast for 3 seconds. Triggered when a pasted
   * build code fails JSON validation (see saveJSON in the Save/Load popup wiring effect above).
   */
  const handleLoadError = () => {
    setShowLoadErrorToast(true);
    setTimeout(() => {
      setShowLoadErrorToast(false);
    }, 3000);
  };
  /**
   * Toggles the Save/Load popup open/closed. Closes the weapon/equipment popups first —
   * all three now render in the same inline panel slot, so only one can be open at a time.
   */
  const toggleSaveWindowState = () => {
    setIsWeaponWindowOpen(false);
    setIsEquipWindowOpen(false);
    setIsSaveWindowOpen(!isSaveWindowOpen);
  }
  /**
   * Toggles the weapon selection popup open/closed. Closes the save/equipment popups first —
   * all three now render in the same inline panel slot, so only one can be open at a time.
   */
  const toggleWeaponWindowState = () => {
    setIsSaveWindowOpen(false);
    setIsEquipWindowOpen(false);
    setIsWeaponWindowOpen(!isWeaponWindowOpen);
  }

  /**
   * Toggles the equipment selection popup open/closed. Closes the save/weapon popups first —
   * all three now render in the same inline panel slot, so only one can be open at a time.
   */
  const toggleEquipWindowState = () => {
    setIsSaveWindowOpen(false);
    setIsWeaponWindowOpen(false);
    setIsEquipWindowOpen(!isEquipWindowOpen);
  }
  /**
   * Called from the weapon SelectionGrid popup when a weapon is picked.
   * @param {number} id - Selected weapon's ID
   */
  const handleWeaponClick = (id) => {
    setWeaponID(id);
    console.log("Setting weapon ID to: " + id);
    toggleWeaponWindowState();
  }
  /**
   * Called from the equipment SelectionGrid popup when an armor piece is picked.
   * Note: the popup is left open (toggleEquipWindowState call below is commented out)
   * so multiple pieces can be picked without reopening the window each time.
   * @param {number} id - Selected armor piece's ID
   * @param {number} type - Slot index (0=Head..4=Leg); only that slot in armorIDs is updated
   */
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
    // toggleEquipWindowState();
  }

  /**
   * Digs the selected weapon's stats out of the deeply nested raw JSON structure and
   * flattens them into weaponBaseStats. The nested `base.base.base.base` chain and the
   * hardcoded `.ChargeAxe` key reflect the raw MHRise data format for this weapon type
   * (see the weaponType=10/Charge Axe note near the top of the component).
   * @param {object} weaponData - Full raw weapon JSON data
   * @param {number} weaponID - ID of the selected weapon
   */
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

  /**
   * Resets weaponBaseStats back to its empty/null state — used when the weapon slot is cleared.
   */
  const clearWeaponBaseStats = () => {
    setWeaponBaseStats({
      rarity: null,
      atk: null,
      aff: null,
      element_type: null,
      element_value: null,
      def_bonus: null,
      sharpness_block: null,
    });
  }

  /**
   * Handles the "x" close button on a WeaponBlock (type=1) or ArmorBlock (type=2, equipType=slot index).
   * Clears the corresponding weapon/armor slot.
   * @param {number} type - 1 for weapon, 2 for armor
   * @param {number} [equipType=-1] - Armor slot index (0=Head..4=Leg), only used when type=2
   */
  const handleCloseButton = (type, equipType = -1) => {
    // console.log("handleCloseButton was called!");
    switch (type) {
      case 1:
        console.log("clear weapon");
        setWeaponID(-1);
        clearWeaponBaseStats();
        break;
      case 2:
        console.log("clear equipment");
        switch (equipType) {
          // NOTE: `case equipType <= 0, equipType >= 4:` uses the comma operator, so this case
          // label evaluates to just `equipType >= 4` (a boolean) and is compared against equipType
          // via ===, which is almost never true — this guard doesn't actually work as intended.
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

  /**
   * Handles the "info" button on a WeaponBlock/ArmorBlock. Currently just logs — no info
   * popup is actually implemented yet (same equipType comma-operator quirk as handleCloseButton above).
   * @param {number} type - 1 for weapon, 2 for armor
   * @param {number} [equipType=-1] - Armor slot index (0=Head..4=Leg), only used when type=2
   */
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

  /**
   * Dev/test helper that fills in a fixed weapon + armor set; not currently wired to any UI
   * (its button in the JSX below is commented out).
   */
  const addRandomBuild = () => {
    setWeaponID(68);
    const randomArmorIDs = [1, 2, 3, 4, 5]
    setArmorIDs(randomArmorIDs);
  }
  // Derived flags for which tab section(s) to render (see selectedTab note near the top)
  const isEquipmentSelected = selectedTab === 0;
  const isStatsSelected = selectedTab === 1;
  const isSkillsSelected = selectedTab === 2;
  const isEverythingSelected = selectedTab === -1;

  // Block rendering until both data fetches (see the mount effect) have completed
  if (!weaponData || !armorData) {
    return <div>Loading...</div>;
  }
  return (
    <main className='container'>
      {/* Mobile tab bar: switches between Equipment/Stats sections; hidden/moot on desktop where isEverythingSelected shows both */}
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
        {/* <div
          className={`tab ${selectedTab === 2 ? 'selected' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Skills
        </div> */}
        <div
          className={'tab SaveWindow'}
          onClick={() => toggleSaveWindowState()}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </div>
      </div>
      {/* Desktop header bar: app title + save button, replaces the floating save button and gives the grid content room to breathe from the top of the screen */}
      {isEverythingSelected &&
        <header className='app-header'>
          <h1 className='app-title'>The Equipment Box</h1>
          <div className='desktop-save-button' onClick={() => toggleSaveWindowState()}>
            <span className='desktop-save-label'>Save/Load</span>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </div>
        </header>
      }
      {/* Equipment tab: weapon slot + 5 armor slots. Clicking a block opens the matching selection popup. */}
      {(isEquipmentSelected || isEverythingSelected) && (
        <section className='gear-container'>
          <WeaponBlock onClick={toggleWeaponWindowState} weapType={weaponType} name={weaponName}
            onClose={() => handleCloseButton(1)} onInfo={() => handleInfoButton(1)} />
          <ArmorBlock armorType={"head"} name={armorNames[0]} rarity={armorRarities[0]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 0)} onInfo={() => handleInfoButton(2, 0)} />
          <ArmorBlock armorType={"chest"} name={armorNames[1]} rarity={armorRarities[1]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 1)} onInfo={() => handleInfoButton(2, 1)} />
          <ArmorBlock armorType={"arms"} name={armorNames[2]} rarity={armorRarities[2]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 2)} onInfo={() => handleInfoButton(2, 2)} />
          <ArmorBlock armorType={"waist"} name={armorNames[3]} rarity={armorRarities[3]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 3)} onInfo={() => handleInfoButton(2, 3)} />
          <ArmorBlock armorType={"legs"} name={armorNames[4]} rarity={armorRarities[4]} onClick={toggleEquipWindowState}
            onClose={() => handleCloseButton(2, 4)} onInfo={() => handleInfoButton(2, 4)} />
        </section>
      )}
      {/* Stats tab: computed attack/defense stats derived from weaponBaseStats and totalDefenses */}
      <section className='stats-container'>
        {(isStatsSelected || isEverythingSelected) && (
          <div className='equipped-stats' >
            {/* maybe have these blocks be their own components */}
            <InfoTab header='Attack Stats'>
              <ul className='attack-stats striped'>
                {weaponBaseStats.atk != null &&
                  <li>
                    <span>Attack (Raw)</span>
                    <span>{weaponBaseStats.atk}</span>
                  </li>
                }
                {weaponBaseStats.aff != null &&
                  <li>
                    <span>Affinity</span>
                    <span>{weaponBaseStats.aff}%</span>
                  </li>
                }
                {weaponBaseStats.aff != null &&
                  <li>
                    <span>Critical Damage Boost</span>
                    <span>125%</span>
                  </li>
                }
                {weaponBaseStats.element_type && weaponBaseStats.element_type !== "None" &&
                  <li style={{gridTemplateColumns: 'auto 60% auto'}}>
                    <span>Element:</span>
                    <span style={{justifyItems: 'end'}}><img src={getIconURL(weaponBaseStats.element_type)} alt="Sword hilt" className='swordhilt' onError={getIconURL()}/> {weaponBaseStats.element_type}</span>
                    <span>{weaponBaseStats.element_value}</span>
                  </li>
                }
                {weaponBaseStats.atk != null &&
                  <li>
                    <span>True Raw</span>
                    <span>{getTrueRawAttack(weaponBaseStats.atk, weaponBaseStats.sharpness_block)}</span>
                  </li>
                }
                {weaponBaseStats.sharpness_block != null &&
                  <li>
                    <span>Sharpness</span>
                    {/* Renders one colored segment per sharpness level (red/orange/.../purple), width scaled from its raw hit count */}
                    <div className='sharpness-bar sharpness-statgrid'>
                      <img src={getIconURL("swordhilt")} alt="Sword hilt" className='swordhilt' onError={getIconURL()}/>
                      {weaponBaseStats.sharpness_block.map((number, index) => (
                        <span key={index} className={`sharp-val-${index + 1}`} style={{ width: `${number * 0.75}px` }}>
                        </span>
                      ))}
                    </div>
                  </li>
                }

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
                  {/* Health/Stamina are hardcoded placeholders — not derived from any build data yet */}
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
        {/* Skills tab: not implemented yet, content commented out below */}
        {(isSkillsSelected || isEverythingSelected) && (<></>
          // <section className='skills-container'>
          //   <div className='equipped-skills' >
          //     <br />
          //     <h4>
          //       Skills - Not yet implemented
          //     </h4>
          //   </div>
          // </section>
        )}
        {/* <button onClick={() => addRandomBuild()}>Click here to add a random build!</button> */}
      </section>
      {/* Save tab popup */}
      <PopupWindow className="equip-window-panel" isOpen={isSaveWindowOpen} setIsOpen={setIsSaveWindowOpen} windowHeader={"Save / Load"}>
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
      <PopupWindow className="equip-window-panel" isOpen={isWeaponWindowOpen} setIsOpen={setIsWeaponWindowOpen} windowHeader={"Select Weapon"}>
        <div className='weapon-window'>
          <SelectionGrid type="weapon" data={weaponData} onClick={handleWeaponClick}></SelectionGrid>
        </div>
      </PopupWindow>
      {/* Equipment tab popup */}
      <PopupWindow className="equip-window-panel" isOpen={isEquipWindowOpen} setIsOpen={setIsEquipWindowOpen} windowHeader={"Select your equipment!"}>
        <div className='equip-window'>
          <ArmorPicker data={armorData} onClick={handleEquipmentClick}></ArmorPicker>
        </div>
      </PopupWindow>
    </main>
  );
}
