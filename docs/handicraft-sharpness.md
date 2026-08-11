# Handicraft sharpness (`takumi_val_list`)

Notes from reverse-engineering how the Handicraft skill's bonus sharpness works in
`mhrice-charge_axe-data.json`, confirmed against in-game testing. Written up so the
reasoning doesn't have to be redone when this gets wired into the UI.

## The field

Every charge blade entry has two parallel arrays at the same nesting level:

```
param[i].base.sharpness_val_list   // [Red, Orange, Yellow, Green, Blue, White, Purple] — base sharpness
param[i].base.takumi_val_list      // 4-element array — Handicraft bonus
```

"Takumi" (匠) is the Japanese internal name for the Handicraft skill. `takumi_val_list`
only has 4 slots (not 7) and its non-zero values always sum to 50 across every
charge blade checked — matching Handicraft's 5 levels x 10 points each in-game.
Weapons with `takumi_val_list: [0,0,0,0]` (9 of 272 charge blades) aren't boostable
by Handicraft at all.

## The rule: edge extension

`takumi_val_list[i]` adds onto `sharpness_val_list[frontierIndex + i]`, where
`frontierIndex` is the index of the last non-zero tier in the weapon's base
`sharpness_val_list` (i.e. its current rightmost/highest color).

```js
function frontierIndex(sharpness) {
  return sharpness.map((v, i) => (v > 0 ? i : -1)).filter(i => i >= 0).pop();
}

function applyHandicraft(sharpness, takumi) {
  const result = [...sharpness];
  const frontier = frontierIndex(sharpness);
  takumi.forEach((bonus, i) => {
    const idx = frontier + i;
    if (idx < result.length) result[idx] += bonus;
  });
  return result;
}
```

In plain terms: Handicraft extends the weapon's current highest color tier first,
and once that tier's allocated points run out, it moves on to the next tier(s) —
it does not always jump straight to Purple, and does not target a fixed color.

### Confirmed examples (Charge Blade)

| Weapon | Base sharpness (R/O/Y/G/B/W/P) | `takumi_val_list` | With Handicraft 5 |
|---|---|---|---|
| Sinister Slasher II | 170/20/20/90/0/0/0 | `[20,30,0,0]` | 170/20/20/**110**/**30**/0/0 |
| Dear Lutemia+ | 10/90/40/120/40/0/0 | `[20,30,0,0]` | 10/90/40/120/**60**/**30**/0 |
| Dear Lutemineva+ | 10/100/40/100/50/50/0 | `[10,40,0,0]` | 10/100/40/100/50/**60**/**40** |

Dear Lutemineva+ initially looked like an exception (in-game it appeared to jump
straight to Purple even at Handicraft level 1), but that was a **weapon augment**
adding a flat +10 sharpness to White outside of Handicraft entirely — it used up
White's remaining headroom before Handicraft was even factored in, so *any*
Handicraft bonus on top of that had nowhere to go but Purple. Once the augment is
accounted for separately, the edge-extension rule holds.

## Open questions / not yet confirmed

- **Level-to-slot mapping**: `takumi_val_list` has 4 slots but Handicraft has 5
  levels. Observed so far: Dear Lutemia+ goes +10 (level 1) → +20 (level 2, i.e.
  the first slot's value of 20 fully realized) → +30 (level 3, second slot's
  value). Levels 4–5 give nothing further for that specific weapon since its
  remaining slots are 0. Not yet confirmed what the general level→slot rule is
  for weapons where all 4 slots are non-zero.
- **Per-tier caps**: the Lutemineva+ augment case implies each tier may have an
  actual maximum capacity (~60 for White, on that weapon at least) that forces
  overflow into the next tier once hit. Not confirmed as a fixed/universal value
  across weapons — may just be a byproduct of the 50-point Handicraft budget
  rather than a hard per-tier cap.
- **Augments** are a separate, loadout-specific system (endgame weapon
  customization) — not present in this weapon JSON at all. They can add flat
  sharpness on top of the base gauge, stacking with (and potentially "using up"
  headroom before) Handicraft's bonus. Not part of this data source; would need
  its own separate model if ever implemented.
- Only Charge Blade data has been checked. Other weapon types aren't in this
  project's data yet (see `CLAUDE.md`/main conversation — currently hardcoded to
  Charge Blade only).

## Where this would plug in

Not implemented yet. The natural spot is a helper alongside `getTrueRawAttack` in
`src/helpers/helpers.js`, taking `sharpness_val_list` + `takumi_val_list` and
returning the maxed-Handicraft array for display in the Stats tab sharpness gauge.
