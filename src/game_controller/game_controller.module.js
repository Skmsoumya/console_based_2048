const game_controller = {
    /* 
            @description:               Checks if the game goal is a valid power of 2.
            @param {number} gameGoal:   The number representing the game goal.
            @returns {boolean}:          True if the passed gameGoal is valid, false otherwise.
    */
    _gameGoalValid(gameGoal) {
        return (Math.log2(gameGoal) % 1) === 0;
    },
    /* 
        @description:                       Check if the game board is of the form of 'NxN' and is square.
        @params {string} gameBoardSize:     The size of the game board in 'NxN' format.
        @return {boolean}:                  True if the game board size is valid, false otherwise.
    */
    _gameBoardSizeValid(gameBoardSize) {
        const validFormatRegex = /(\dx\d)/;
        const validNumberRegex = /(\d)/;
        return (
            validFormatRegex.exec(gameBoardSize) &&
            validNumberRegex.exec(gameBoardSize[0]) &&
            gameBoardSize[0] === gameBoardSize[2] &&
            gameBoardSize[0] !== "0"
        );
    },
    /* 
        @description: A config object for setting up the game state.

        @param {object} config: The configuration object for the game controller.
            @properties:
                - @required {number} gameGoal:            The end goal of the game. Must be a power of 2.
                - @required {string} gameBoardSize:       The size of the game board written in "NxN" format.
                - @required {function} initiateDataModel: Function to initiate the initial state of the game data.
                - @required {function} getGameState:      Function to get current game state.
                - @required {function} performAction:     Function to perform an action on game state.
                - @required {function} renderGameBoard:   Function to render the game board in UI.
                - @required {function} initiateUserInputInterface: Function to initiate the user input interface.
                - @required {function} actions:           A list of actions that can be performed on the board.
        @returns {undefined}
    */
    init({
        gameGoal,
        gameBoardSize,
        initiateDataModel,
        getGameState,
        performAction,
        renderGameBoard,
        initiateUserInputInterface,
        actions
    }) {
        if (
            !this._gameGoalValid(gameGoal) ||
            !this._gameBoardSizeValid(gameBoardSize) ||
            !(initiateDataModel && typeof initiateDataModel === "function") ||
            !(getGameState && typeof getGameState === "function") ||
            !(performAction && typeof performAction === "function") ||
            !(renderGameBoard && typeof renderGameBoard === "function") ||
            !(initiateUserInputInterface && typeof initiateUserInputInterface === "function") ||
            !(actions && typeof actions === "object")
        ) {
            this.getGameState = getGameState;
            this.performAction = performAction;
            this.actions = actions;
            
            initiateDataModel(gameGoal, parseInt(gameBoardSize[0]));
            initiateUserInputInterface(this.handleUserInput.bind(this));
            renderGameBoard(getGameState());
        }
    },
    /* 
        @description: A callback function for handling user input.
        @param {string} userInput: The user input registered.
        @returns {undefined}
    */
    handleUserInput(userInput) {

    }
};

module.exports = {
    init: game_controller.init.bind(game_controller),
}