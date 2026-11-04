# Godsight - A GBF Battle Analysis Extension

Godsight is a free browser extension intended to be used with the browser game [Granblue Fantasy](https://game.granbluefantasy.jp/). It reads game actions sent to the client from the server and processes them into useful information, breakdowns, charts, etc.

## Granblue Fantasy ToS Compatibility

This extension does not modify any code in the game itself. It does not inject any scripts, and it uses a separate UI in your developer tools (F12/CTRL+SHIFT+I) to display all of its information. An explicit aim for this extension was to be ToS-compatible by any _reasonable_ definition. That said, the ToS is pretty broad about external tools, and while that's likely intended for things that give you an actual gameplay advantage, like a bot or UI modifications, it's probably best to avoid associating your account with this tool in videos or screenshots. Some game developers are _very_ strict with these things. :/

## Warnings

### Security

To be able to read response bodies from the server, an extension must either patch the main window's XHR functions or use devtools APIs. As the former would definitely break Granblue Fantasy's TOS, this extension opts for the latter. There are some other advantages, too, such as there being no risk of buggy code in the extension breaking the game's webpage.

Devtools APIs are very powerful and thus very dangerous for users installing such extensions. _You should be exceedingly cautious when thinking of using them, as a malicious extension could steal your cookies or act on your behalf._ For proper safety, it is recommended to only run this extension in a browser dedicated to Granblue Fantasy.

Review the code of this extension carefully, or ask a trusted individual familiar with such things to do so on your behalf.

The only code that interfaces with the devtools APIs is in [/src/devtools.ts](/src/devtools.ts) and [/src/react/app.tsx](/src/react/app.tsx), which should reduce the footprint of reviewing this repository for security concerns to a minimum.

### Detectability

Under the extension's default configuration, the game should not be able to detect it. If you choose to enable loading of character portraits and status effect icons, these resources are generally cached and put no extra load on the game servers, but the access patterns of these resources might change in a way that makes it possible to detect this extension if Cygames tries hard enough. It's not necessarily certain, just my personal speculation. There is also the possibility that you open up old recorded battle data in the extension and all the assets are uncached for whatever reason, causing the extension to fetch all of them at once.

It is recommended to keep the image setting off, and use the "Click status text to load icon" setting if you need more information about status effects (since they can sometimes contain information that is lost through the purely-textual description of status effects, such as duration or stack count).

## Installation

- Download a release and extract the zip file to its own folder.
- In the browser you use to play GBF, go into the Extensions menu, click "Manage Extensions", find the "Developer mode" switch, and turn it on.
- A "Load unpacked" button should appear in the UI. Click it, find the folder you extracted the extension zip file to, and select it.

## Usage

- **NOTE 1:** Refreshing too fast will cause the extension to miss data. The safe timing for refreshing is approximately how long it takes for your ingame honors score to update under normal conditions (actually a little sooner but it's an easy cue). If your honors update gets delayed due to server load, but your button press is being executed in the client, you are still safe to refresh.
  - A warning icon will be displayed if missing data is detected, but the extension can't detect all cases.
- **NOTE 2:** The extension **does** support multi-window gameplay, but it can only detect battle data from an inspected window. If you want to play the game in multiple windows (e.g., for speedmaxxers using Fated Chains in a second window), make sure to open the extension panel in those other windows as well. Updates will be reflected across all open extension panels.
- **NOTE 3:** Loading images from the GBF CDN is disabled by default (see the "Detectability" section). It is worth noting that status effect icons can actually be important as they contain information like stack counts or a local debuff's remaining duration. The extension attempts to recover and display some of this information if images are disabled, but it is imperfect due to inconsistent naming schemes between status effects. There is a setting to display specific status effect icons without loading all images.

<br/>

- Navigate to the Granblue Fantasy game website (https://game.granbluefantasy.jp or https://steam.granbluefantasy.com)
- Open the Developer Tools with F12 or CTRL+SHIFT+I.
- Select the Godsight tab in the Developer Tools.
- The extension will automatically begin listening for battle data.
  - If you have a battle already started, refresh it while the extension is listening to get it to start tracking the battle.
- View data and visualizations for recorded battles, as well as actions (approximately grouped) taken in battle.
- Click the **⚙** icon in the top right to configure settings.

## Limitations

- **The extension will function when the ingame language is set to Japanese, but the extension itself currently does not have a Japanese translation.**
- This extension cannot intercept battle updates from other players. Thus, you will not see HP update inside the extension until you perform an action (similar to the ingame "Live Battle Feed" setting being off).

## Bug Reports and Contributions

- Please file a github issue if you should find any bugs. Please note that the following are not considered bugs:
  - "Wrong-looking" action grouping under Turn Actions.
    - This is because the grouping is a best effort transformation of data that isn't at all designed to map to a player's intuition of what an "action" should be. The game client can order things strangely relative to the stated order of operations in skill and passive descriptions.
- The following ARE considered bugs:
  - Incorrect damage values. The "total damage" should always match the ingame end-of-battle Battle Log _as long as no actions were missed via refreshing too quickly_.
  - Incorrect damage attribution. I suspect there are unavoidable cases, for instance due to ordering weirdness with Rigor damage and on-dispel passives, but I haven't found any yet.
- You may make pull requests to this project.
  - AI-assisted code is allowed, **however:**
    - Do not "vibe-code". You are expected to understand all code you submit.
    - Do not respond to questions about your code by pasting the questions into your AI assistant and regurgitating the answers. Be better than a "meat proxy".
    - You are responsible for all code you submit.

## Development Status

This project is currently under active development.

- [x] - Verify correctness in as many raids as possible
  - [x] Dark Rapture (Hard)
  - [x] Hexachromatic Hierarch
  - [x] Dark Rapture Zero
  - [x] Versusia
  - [x] FA basically everything
  - [x] Sandbox
  - [x] Solomonis
  - [x] Babyl
