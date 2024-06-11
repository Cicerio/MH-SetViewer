import '../css/ArmorSetGrid.css'

function convertToThreeDigits(number) {
  return number.toString().padStart(3, '0');
}
export default function ArmorSetGrid({ armorID, data, ...props }) {
  const armorTypes = ["Head", "Chest", "Arm", "Waist", "Leg"];
  const armorTypeRefs = [
    "armor_head_name_msg", 
    "armor_chest_name_msg", 
    "armor_arm_name_msg",
    "armor_waist_name_msg", 
    "armor_leg_name_msg"]
  const nameID = convertToThreeDigits(armorID);
  if (data && data.armor && data.armor.param) {
    let armorSet = {
      Head: null,
      Chest: null,
      Arm: null,
      Waist: null,
      Leg: null,
    },
      armorSetNames = {
        ArmorSet: null,
        Head: null,
        Chest: null,
        Arm: null,
        Waist: null,
        Leg: null,

      };
    let setName = data ? data.armor_series_name_msg.entries.find(obj => obj.name === "ArmorSeries_Hunter_" + nameID)?.content[1] : nameID;
    
    armorTypes.forEach((element) => {
      // find base data
      armorSet[element] = data.armor.param.find(obj => obj.pl_armor_id[element] === armorID) || [element];
      console.log(armorSet[element].pl_armor_id);
      //find names
      const nameData = data[armorTypeRefs[armorTypes.indexOf(element)]];
      armorSetNames[element] = nameData ? nameData.entries.find(obj => obj.name === 'A_'+[element]+'_' + nameID + '_Name')?.content[1] : [element];
      console.log(armorSetNames[element]);
    });
    // Object.keys(data).forEach((property) => {
    //   if(armorTypeRefs.includes(property)){
    //     armorSetNames[element] = data ? data[armorTypeRefs[armorTypes.indexOf[element]]].entries.find(obj => obj.name === 'A_'+[element]+'_' + nameID + '_Name')?.content[1] : [element];
      
    //   }
    // });
    return (
      <div className='ArmorSetGrid'>
        <div className='ArmorSetGrid-setName'>{setName}</div>
        <div className='ArmorSetGrid-content'>
          <span>{armorSetNames.Head}</span>
          <span>{armorSetNames.Chest}</span>
          <span>{armorSetNames.Arm}</span>
          <span>{armorSetNames.Waist}</span>
          <span>{armorSetNames.Leg}</span>
        </div>
      </div>
    );
  } else {
    return (<></>)
  }
  // weaponData.charge_axe.base_data.param.find(obj => obj.base.base.base.base.id.ChargeAxe === weaponID) : null);


}