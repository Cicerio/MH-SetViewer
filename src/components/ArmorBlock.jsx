import '../css/WeaponBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function getEquipIcon(armorType) {
  switch (armorType) {
    case "head":
      return "icons/MH-Icons/Armor/Head-Rarity-1.png";
    case "chest":
      return "icons/MH-Icons/Armor/Chest-Rarity-1.png";
    case "arms":
      return "icons/MH-Icons/Armor/Arms-Rarity-1.png"
    case "waist":
      return "icons/MH-Icons/Armor/Waist-Rarity-1.png"
    case "legs":
      return "icons/MH-Icons/Armor/Legs-Rarity-1.png"
  }

}

export default function ArmorBlock({ onClick, onClose, onInfo = null, ...props }) {
  const handleButtonClick = (e, type) => {
    e.stopPropagation();
    // console.log("WeaponBlock: handleButtonClick was called");
    switch (type) {
      case true:
        // console.log("WeaponBlock: Info was called") 
        onInfo();
        break
      case false:
        // console.log("WeaponBlock: Close was called")
        onClose();
        break;
      default:
        console.error("Error, unknown type of button click");
    }
  }
  return (
    <>
      <div className="gearItem-container" onClick={onClick}>
        <div className="item-container">
          <div className="slot-icon">
            <img alt="slot icon" src={getEquipIcon(props.armorType)}></img>
          </div>
          <div className="selected-item">
            {props.name && (<>{props.name}</>)}
          </div>
          <button className="info-button" aria-label='info'
            onClick={(e) => handleButtonClick(e, true)}>
            <FontAwesomeIcon icon={faGripLinesVertical} />
          </button>
          <button className="clear-button" aria-label='clear'
            onClick={(e) => handleButtonClick(e, false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  )
}