import React, { useEffect } from "react";
import ArmorSetGrid from "./ArmorSetGrid";
import WeaponSelectBlock from "./WeaponSelectBlock";

export default function SelectionGrid({ type, data, ...props }) {

  return (
    <>


      <div className="selection-grid">
        {type === "weapon" &&
          <>
            <WeaponSelectBlock></WeaponSelectBlock>
            <div>Weapon 2</div>
            <div>Weapon 3</div>
          </>
        }
        {type === "equipment" &&
          <>
            <ArmorSetGrid armorID={0} data={data}></ArmorSetGrid>
            <ArmorSetGrid armorID={51} data={data}></ArmorSetGrid>
          </>
        }
      </div>

    </>
  );
}