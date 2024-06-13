import '../css/WeaponBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getWeaponIconURL } from "../helpers/helpers";


export default function WeaponBlock({onClick, onClose, onInfo, ...props}) {
  /**
   * Id/Name style:
   * W_ChargeAxe_{ID}_{Name, Explain}
   */
  const handleButtonClick = (e, type) => {
    e.stopPropagation();
    // console.log("WeaponBlock: handleButtonClick was called");
    switch (type){
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
            <img alt="slot icon" src={getWeaponIconURL(props.weapType, 1)}></img>
          </div>
          {props.name && (
            <div className="selected-item">
              {props.name}
            </div>
          )}
          <button className="info-button" aria-label="info" 
          onClick={(e) => handleButtonClick(e, true)}>
            <FontAwesomeIcon icon={faGripLinesVertical} />
          </button>
          <button className="clear-button" aria-label="clear" 
          onClick={(e) => handleButtonClick(e, false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}
