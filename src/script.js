/**
 * Loads the webpage, and reads the build JSON file
 */
// Define the path to the JSON file
const jsonFilePath = 'mh-build1.json';

// Fetch the JSON file asynchronously
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
     /**
      * doIconCheck loads the icons of the equipment on the page.
      */
     let armorKeys = Object.keys(jsonData.armor);
    /**
     * Loads icons on the page
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    function doIconCheck(){
      /* */
      let count = 0;
      const iconElements = document.querySelectorAll('.icon');
    
      iconElements.forEach(iconElement => {
        // Create a new image element
        const img = document.createElement('img');
        if(count === 0){ 
          img.src = "icons/MH-Icons/Weapons/" + 
                    jsonData.weapon.type + 
                    "-Rarity-" + 
                    jsonData.weapon.rarity + ".svg";
        } else if(count >= 1 && count <= 5){
           img.src = "icons/MH-Icons/Armor/" + 
                    armorKeys[count-1] + 
                    "-Rarity-" + 
                    jsonData.armor.head.rarity + ".png";
        } else if (count === 6){
          img.src = "icons/MH-Icons/Talismans/Talisman" +  
                    "-Rarity-" + 
                    jsonData.talisman.rarity + ".png";
        }
        img.alt = "icon";
        img.width = 65;
        img.height = 65;
        // Clear any existing content in the icon element
        iconElement.innerHTML = '';
    
        // Append the new image tag to the icon element
        iconElement.appendChild(img);
        count++;
      });
    }
    /**
     * A description of the entire function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    function fillWeapStats(){
      let weapName = document.querySelector(".equipWeap > .stats > .name"),
          attack = document.querySelector(".attack-num"),
          affinity = document.querySelector(".affinity-num");
          element = document.querySelector(".element-num");
      
      // Set stat values
      weapName.innerHTML = jsonData.weapon.name;
      attack.innerHTML = jsonData.weapon.attack;
      affinity.innerHTML = jsonData.weapon.affinity;
      element.innerHTML = "Elm: " + jsonData.weapon.element;

      // set and display decoration values
      /* TODO: Add deco slots for weapons and armor */
    }
    /**
     * Creates a skill box element with a name and level based on the given skill.
     *
     * @param {Array} skill - An array containing the name and level of the skill.
     * @return {HTMLElement} - The created skill box element.
     */
    function createSkillBox(skill){
      let skillBox = document.createElement("div"),
            name = document.createElement("div"),
            level = document.createElement("div");
        skillBox.className = "armor-skill";
        //create the name, then the level of the skill
        name.className = "armorSkill-name"
        name.innerHTML = skill[0];
        level.className = "armorSkill-level"
        level.innerHTML = "Level " + skill[1];
        
        skillBox.appendChild(name);
        skillBox.appendChild(level);
      return skillBox
    }
    function searchAndGetNumber(records, searchString) {
      for (let i = 0; i < records.length; i++) {
        // Check if the first element of the inner array matches the search string
        if (records[i][0] === searchString) {
          // If found, return the corresponding number (the second element of the inner array)
          return records[i][1];
        }
      }
      // If the search string is not found, return null
      return null;
    }

    doIconCheck();
    fillWeapStats();
    
    // Fill out the armor stats, going through every armor value
    // head, chest, arms, waist, legs
    for (const armorKey of armorKeys) {
      const armorItem = jsonData.armor[armorKey];
      let name = document.querySelector("."+armorKey+" > .skills > .name");
      name.innerHTML = armorItem.name;
      armorItem.skills.forEach(skill => {
        skillsList = document.querySelector("."+armorKey+" > .skills > .skills-list");
        skillsList.appendChild(createSkillBox(skill));
      });
    }

    // fill in talisman stats
    // adding the talisman name
    talismanName = document.querySelector(".talisman > .skills >.name");
    talismanName.innerHTML = jsonData.talisman.name;
    //filling in each skill 
    jsonData.talisman.skills.forEach(skill => {
      let taliSkillsBox = document.querySelector(".talisman > .skills > .skills-list");
      taliSkillsBox.appendChild(createSkillBox(skill));
    });
    //Filling in decorations
    let taliDecoCount = 1;
    jsonData.talisman.decorations.forEach(deco => {
      decoSlot = document.querySelector(".talisman > .decos > .decoSlot" + taliDecoCount)
      decoIcon = document.createElement("div");
      decoIcon.className = "decoIcon";
      decoIcon.innerHTML = deco[2] + "-Slot";

      decoSkill = createSkillBox(deco);
      decoSkill.className = "deco-skill"

      decoSlot.appendChild(decoIcon);
      decoSlot.appendChild(decoSkill);
      taliDecoCount++;
    })
    

    // Calculating skills
    skillsStorage = [];
    /**
     * Traverses an object or array recursively and performs a manipulation on arrays with keys 'skills' or 'decorations'.
     *
     * @param {Array|Object} obj - The object or array to traverse.
     * @return {undefined} This function does not return a value.
     */
    //Chatgpt helped me make this recursive function
    function traverse(obj) {
      if (Array.isArray(obj)) {
        // If the current value is an array, iterate over its elements
        obj.forEach(item => {
          traverse(item);
        });
      } else if (typeof obj === 'object') {
        // If the current value is an object, iterate over its keys
        for (const key in obj) {
          if ((key === 'skills' && Array.isArray(obj[key])) ||
                key === 'decorations' && Array.isArray(obj[key])) {
            // console.log('Found ' + key +' array:', obj[key]);
            // Perform your manipulation here
            // Check if the object has 'skills' array with two elements (name and number)
            const name = obj[key][0][0];
            const number = obj[key][0][1];
            
            console.log(name);
            // Find if the name already exists in the skillsStorage array
            const recordIndex = skillsStorage.findIndex(record => record[0] === name);
            if (recordIndex !== -1) {
              // If the name already exists, add the number to the existing total
              skillsStorage[recordIndex][1] += number;
            } else {
              // If the name does not exist, add a new record, but only if the name isnt blank
              if(name !== ""){
                skillsStorage.push([ name, number ]);
              }
            }
          }
          traverse(obj[key]); // Recursively traverse each value
        }
      }
    }
    traverse(jsonData);

    // After gathering the skills, display them in the left column
    const sortedSkills = skillsStorage.sort((a, b) => b[1] - a[1]);
    console.log(skillsStorage);
    console.log(sortedSkills);
    sortedSkills.forEach(skill => {
      let column = document.querySelector(".skills-display");
      console.log(skill[0])
      let skillBox = createSkillBox(skill);
      skillBox.className = "total-skill";
      if(skill[1] === 7){
        skillBox.className += " maxSkill";
      }
      column.appendChild(skillBox);
    });
    
    /**
     * STATS CODING TIME
     */

    let statBlock = document.querySelector(".statblock"),
        attackStat = 0,
        affinityStat = 0,
        elementStat = 0,
        // first is the raw, the other 5 are elemental defenses
        defenseStat = [0, 0, 0, 0, 0, 0];

    //calculate skills into stats
    let critSkillNum = searchAndGetNumber(sortedSkills, "Critical Eye"),
        atkSkillNum = searchAndGetNumber(sortedSkills, "Attack Boost")
    if(critSkillNum >= 1 && critSkillNum <= 6){
      affinityStat += (critSkillNum * 5);
    } else if (critSkillNum === 7){
      affinityStat += 40;
    }
    if (atkSkillNum >= 1  && atkSkillNum <= 3){
      attackStat += atkSkillNum * 3;
    }
    
    for (const armorKey of armorKeys) {
      const armorItem = jsonData.armor[armorKey];

      defenseStat[0] += armorItem.defense.raw 
    }
    console.log("Defense: " + defenseStat[0]);

    statTotal = [];
    statTotal.push( "Attack = " + attackStat);
    statTotal.push("Affinity = " + affinityStat + "%");
    statTotal.push("Element = " +elementStat);
    statTotal.push(defenseStat);

    
    // Write the stats out in the statblock flexbox
    statTotal.forEach(stat => {
      statBox = document.createElement("div")
      statBox.className = "stat-box";
      
      if(Array.isArray(stat)){
        statBox.innerHTML = "Defenses: \n"

        statBox.innerHTML += "Raw: " + stat[0];
        statBlock.appendChild(statBox);
      }else{

        statBox.innerHTML = stat;
        statBlock.appendChild(statBox)
      }
    });


    // list all the rarities through the json file.
    rarityArray = [];
    rarityArray.push(jsonData.weapon.rarity);
    for (const armorKey of armorKeys) {
      const armorItem = jsonData.armor[armorKey];
      rarityArray.push(armorItem.rarity);
    }
    rarityArray.push(jsonData.talisman.rarity);

    console.log(rarityArray);
    rarityBlock = document.createElement("div");
    rarityBlock.innerHTML = "Rarities of Equipment in order: "
    rarityArray.forEach(element => {
      rarityBlock.innerHTML += element + " ";
    });
    statBlock.appendChild(rarityBlock);

  })
  .catch(error => {
    console.error('Error fetching JSON file:', error);
  });

