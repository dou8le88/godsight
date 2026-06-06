# Godsight - A GBF Theorycrafting Extension

Godsight is a free browser extension intended to be used with the browser game [Granblue Fantasy](https://game.granbluefantasy.jp/). It reads game actions sent to the client from the server and processes them into useful information, breakdowns, charts, etc.

## Granblue Fantasy TOS Compatibility

This extension does not modify any code in the game itself. It does not inject any scripts, and it uses a separate UI in your developer tools (F12/Ctrl+Shift+I) to display all of its information. As such, it should be fully TOS-compatible.

## Warnings

To be able to read response bodies from the server, an extension must either patch the main window's XHR functions or use devtools APIs. As the former would break Granblue Fantasy's TOS, this extension opts for the latter.

Devtools APIs are very powerful and thus very dangerous for users installing such extensions. *You should be exceedingly cautious when thinking of using them, as a malicious extension could steal your cookies or act on your behalf.*

Review the code of such extensions carefully, or ask a trusted individual familiar with such things to do so on your behalf.

The only code that interfaces with the devtools APIs is in [/src/devtools.ts](/src/devtools.ts) and [/src/react/app.tsx](/src/react/app.tsx), which should reduce the footprint of reviewing this repository for security concerns to a minimum.

## Development Status

This project is currently under active development.

- [x] Initial boilerplate and placeholder stuff to make a devtools panel show up.
- [x] Schema types for common battle actions.
- [x] Listen to browser navigation and disable response parsing if on other webpages, and enable it when on the GBF website.
- [x] Display a banner in the Godsight panel when on other websites, and show the normal UI when navigating to the game.
- [ ] Parse response bodies to determine command schemas.
- [ ] Handle commands and relevant battle data.
    - [ ] ABILITY
    - [ ] WINDOW_EFFECT
    - [ ] BUFF_AND_DEBUFF_CHANGED
    - [ ] MESSAGE
    - [ ] BOSS_HP
    - [ ] DAMAGE_DEALT
    - [ ] DAMAGE_DEALT_MULTIHIT
    - [ ] HONORS_GAINED
    - [ ] FATED_CHAIN_GAUGE_CHANGE
    - [ ] SUMMON
    - [ ] HEALING
    - [ ] BOSS_SPECIAL_ATTACK
    - [ ] CA_METER_CHANGED
    - [ ] NORMAL_ATTACK
    - [ ] CHARACTER_CHARGED_ATTACK
    - [ ] MC_CHARGED_ATTACK
    - [ ] CHAIN_BURST
    - [ ] HP_CHANGED
    - [ ] DEATH
    - [ ] REPLACE_CHARACTER
    - [ ] WON_BATTLE
    - [ ] FULL_ELIXIR
    - [ ] Disabling effects on characters and bosses (Can't Act, Charm, Weakened, etc.)
    - [ ] Other
- [x] Basic UI with party member portraits
- [ ] Basic battle summary describing the outcomes of actions.
- [ ] Select a portrait to view that character's specific battle contributions.
- [ ] More detailed result display: hitcounts (total/by damage type), debuffs applied count, etc.
- [ ] Pie chart - damage by type.
- [ ] Average damage per action name/type.