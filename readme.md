# A console based 2048 game.

## Requirements to play the game:

The game needs you to have node 12.13.0 or greater and npm 6.12.0 or higher installed in your system.
The game might run in other versions of the node and npm but it is not tested.
Install the latest version of node and npm by visiting: [https://nodejs.org/](https://nodejs.org/en/)

## How to play the game:

1. Clone the repository to a local folder
2. CD into the root of the application.
3. Install all dependencies with `npm install`
4. Start the game `npm run start` or `yarn start` (if you have yarn installed).


## Features:
> The game is extensible, the game board can be configured to render any square size board. 
> The game is modular, Modules can be replaced easily to add features such as UI, Controller support, etc.
> The game can be configured to play 4096, or 8192. Ie. any power of two can be a valid game goal.
> Because of the modular nature the game can be integrated to game playing agents.

## Implementation Description:

**Game Controller:**

`root/game_controller/game.controller.js`

This is the controller of the application. This has a init function that accepts the game size, game goal and hosts of interface
functions. Check the implementation for details.

**Game Data Model:**

`root/data_model/data.model.js`

This holds the state of the game and provides interface functions to modify and for getting the game state.
Check the implementation for details.

**Game UI View:**

`root/view/game_ui.view.js`

This view handles the UI for the game board. Check the implementation for details.

**User Input Interface View:**

`root/view/user_input_interface.view.js`

This view handles the interface for users input. Check the implementation for details.

**Game Won View:**

`root/view/game_won.view.js`

This view handles the interface for rendering the UI for the victorious state. Check the implementation for details.

**Game Lost View:**

`root/view/game_lost.view.js`

This view handles the interface for rendering the UI for the defeat state. Check the implementation for details.

**Error Handler Utility:**

`root/utils/error_handler.module.js`

This utility handlers the game's errors. Check the implementation for details.
