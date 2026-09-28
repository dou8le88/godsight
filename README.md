# Godsight - A GBF Battle Analysis Extension

Godsight is a free browser extension intended to be used with the browser game [Granblue Fantasy](https://game.granbluefantasy.jp/). It reads game actions sent to the client from the server and processes them into useful information, breakdowns, charts, etc.

## Granblue Fantasy ToS Compatibility

This extension does not modify any code in the game itself. It does not inject any scripts, and it uses a separate UI in your developer tools (F12/Ctrl+Shift+I) to display all of its information. An explicit aim for this extension was to be ToS-compatible by any "reasonable" definition. That said, the ToS is pretty broad about external tools, and while that's likely intended for things that give you an actual gameplay advantage, like a bot or UI modifications, it's probably best to avoid associating your account with this tool in videos or screenshots. Some game developers are *very* strict with these things. :/

## Warnings

To be able to read response bodies from the server, an extension must either patch the main window's XHR functions or use devtools APIs. As the former would break Granblue Fantasy's TOS, this extension opts for the latter.

Devtools APIs are very powerful and thus very dangerous for users installing such extensions. *You should be exceedingly cautious when thinking of using them, as a malicious extension could steal your cookies or act on your behalf.*

Review the code of such extensions carefully, or ask a trusted individual familiar with such things to do so on your behalf.

The only code that interfaces with the devtools APIs is in [/src/devtools.ts](/src/devtools.ts) and [/src/react/app.tsx](/src/react/app.tsx), which should reduce the footprint of reviewing this repository for security concerns to a minimum.

## Development Status

This project is currently under active development.

- [x] Listen to browser navigation and disable response parsing if on other webpages, and enable it when on the GBF website.
- [x] Display a banner in the Godsight panel when on other websites, and show the normal UI when navigating to the game.
- [x] Parse response bodies to determine command schemas.
- [x] Handle commands and relevant battle data.
- [x] Basic UI with party member portraits
- [x] Basic battle summary describing the outcomes of actions.
- [x] More detailed result display: hitcounts (total/by damage type), debuffs applied count, etc.
    - [ ] Stats variant that just shows before-boss-action stuff ("omen-cancel-contributing stats")
- [X] DPS/DPT view
    - [X] Current DPS/DPT
    - [X] Last turn damage
    - [X] Individual character DPS/DPT
    - [X] Damage distribution pie graphs
    - [X] Damage distribution by turn bar graphs
    - [ ] Damage info per action.