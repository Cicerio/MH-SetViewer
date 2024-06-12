import React, { useEffect } from "react";
import ArmorSetGrid from "./ArmorSetGrid";
import WeaponSelectBlock from "./WeaponSelectBlock";

export default function SelectionGrid({ type, data, onClick, ...props }) {
  const sampleWeaponIDs = [1, 23, 56, 120, 22]
  return (
    <>
      <div className="selection-grid">
        {type === "weapon" &&
          <>
            <WeaponSelectBlock weaponID={sampleWeaponIDs[0]} data={data} onClick={onClick} />
            <WeaponSelectBlock weaponID={sampleWeaponIDs[1]} data={data} onClick={onClick} />
            <WeaponSelectBlock weaponID={sampleWeaponIDs[2]} data={data} onClick={onClick} />
            <WeaponSelectBlock weaponID={sampleWeaponIDs[3]} data={data} onClick={onClick} />
            <WeaponSelectBlock weaponID={sampleWeaponIDs[4]} data={data} onClick={onClick} />
          </>
        }
        {type === "equipment" &&
          <>
            <ArmorSetGrid armorID={0} data={data} onClick={onClick}></ArmorSetGrid>
            <ArmorSetGrid armorID={51} data={data} onClick={onClick}></ArmorSetGrid>
            <ArmorSetGrid armorID={22} data={data} onClick={onClick} />
          </>
        }
      </div>
    </>
  );
}