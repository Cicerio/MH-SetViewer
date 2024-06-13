import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import '../css/InfoTab.css';
export default function InfoTab({ children, header = "", hideIfNull=0, ...props }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }
  return (
    <>
      <div className="infotab" style={{ margin: "10px 0px" }}>
        <div className="infotab-header" style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          justifyContent: "space-between"
        }}>
          <h4 style={{ margin: "1px 1px" }}>{header}</h4>
          {isOpen
            ? <i onClick={() => toggleIsOpen()}>
              <FontAwesomeIcon icon={faSquareMinus} />
            </i>
            : <i onClick={() => toggleIsOpen()}>
              <FontAwesomeIcon icon={faSquarePlus} />
            </i>}
        </div>

        {isOpen &&<>
          <hr></hr>
          <div className="infotab-content">
            {children}
          </div>
        </>}
      </div>
    </>
  );
}