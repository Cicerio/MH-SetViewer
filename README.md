# The Equipment Box (Monster Hunter Rise Set Builder)
A small website for a monster hunter build creator/viewer based on JSON files.

Right now, it only can view properly written JSON files.

Originally a small school project, I'mma try to get this properly working.
Credit to: MHRice Info site for the data ripped from MH:Rise/Sunbreak.

Features:
* Built with React to offer a smooth and user-friendly app interface for both mobile and desktop.
* Can select armor from all of the base game armors (sunbreak armors will be added soon)
* Select weapons (Charge Blade Only, for now) from a variety of different weapons, and see their stats
* The stats page gives a combination of all the stats you will have with the selected equipment, 
  including proper damage modified for sharpness levels.

##### TODO:
* Write detailed tooltips for stats and weapons.
* Add support for Sunbreak armors, - INCOMPLETE - WIP
    - Maybe even have a Sunbreak-Iceborne mode swapping - After finishing sunbreak support
* Support for more weapons
* Implementation of more game mechanics, such as:
  - Skills
  - Weapon types other than Charge Blade
  - Talismans
  - Sunbreak armors
    * Also Qurio armor, weapon, and talisman support
07/25/06 -
Multiple monster hunters on the horizon
* Tidy up MHRise tab
* BUGFIXING!
  - clearing armor/weapons doesn't clear stats. fix that
    * handleWeaponStatChange isn't sensing the -1 weaponID.
      + Also, monster hunter doens't let you unequip weapon, so maybe have the unnecessary stats vanish whenever they are unused?
  - sharpness gauge in stats doesn't shrink properly.
    * Also add string form (30 hits of White, 15 hits of Green, etc)
* Theme overhaul for Rise, make it more like the game (and cleaner)
* Add support for MH4U, MHGU, and MHWilds and World
  - MHGU and MH4U will require different skill systems.
  - MHWilds requires two weapons.

+ Priority list!
  1. Function - Make it work for Rise.
    - QoL Toggle between Select all equipment vs Click head =  only show head and vice versa
    - Add support for every weapon.
      - Various stats for each weapon type.
        + Charge Blade - Phial type
        + Gunlance - Shell type (how many too)
        + Insect Glaive - Add slot for Bug Buddy and give accompanying stats
        + Bowguns - oh boy
          * Bow - Coatings
          * Bowguns
            - Ammo types
            - Special ammo type
  2. Make it work for different games.
    - Wilds and World skills work mostly the same
      - MH4U and GU have different skill type

## Installation
1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the application using `npm run dev`.
