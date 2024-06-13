import React, { useEffect } from "react";
import ArmorSetGrid from "./ArmorSetGrid";
import WeaponSelectBlock from "./WeaponSelectBlock";

export default function SelectionGrid({ type, data, onClick, ...props }) {
  const sampleWeaponIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const sampleArmorIDs = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  return (
    <>
      <div className="selection-grid">
      {type === "weapon" &&
          <>
            {sampleWeaponIDs.map((weaponID) => (
              <WeaponSelectBlock key={weaponID} weaponID={weaponID} data={data} onClick={onClick} />
            ))}
          </>
        }
        {type === "equipment" &&
          <>
            {sampleArmorIDs.map((armorID) => (
              <ArmorSetGrid key={armorID} armorID={armorID} data={data} onClick={onClick} />
            ))}
          </>
        }
      </div>
    </>
  );
}