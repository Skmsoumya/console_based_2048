const {errorHandler, errorTypes} = require("../utils/error_handler.module");

const game_controller = {
    /* 
        valid game inputs
    */
    validInputs: {
        "TOP": "TOP",
        "LEFT": "LEFT",
        "BOTTOM": "BOTTOM",
        "RIGHT": "RIGHT"
    },
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
                - @required {function} activateUserInputListener: Function to activate the user input listener.
                - @required {function} getGameGoal:       A function to get the game goal number.
                - @required {function} addNumberToBoard:  A function to add a new number to the board.
                - @required {function} checkIfGameWon:    A function to check if the user already reached the goal.
                - @required {function} isNextMoveNotPossible:    A function to check if the next move is not possible.
                - @required {function} gameWonRenderer:    A function to render the game won UI
                - @required {function} gameLostRenderer:    A function to render the UI for game over state.
                - @required {object} actions:           A list of actions that can be performed on the board.
        @returns {undefined}
    */
    init({
        gameGoal,
        gameBoardSize,
        initiateDataModel,
        getGameState,
        performAction,
        renderGameBoard,
        activateUserInputListener,
        addNumberToBoard,
        checkIfGameWon,
        isNextMoveNotPossible,
        gameWonRenderer,
        gameLostRenderer,
        actions,
        getGameGoal
    }) {
        if (
            !this._gameGoalValid(gameGoal) ||
            !this._gameBoardSizeValid(gameBoardSize) ||
            !(initiateDataModel && typeof initiateDataModel === "function") ||
            !(getGameState && typeof getGameState === "function") ||
            !(performAction && typeof performAction === "function") ||
            !(renderGameBoard && typeof renderGameBoard === "function") ||
            !(activateUserInputListener && typeof activateUserInputListener === "function") ||
            !(addNumberToBoard && typeof addNumberToBoard === "function") ||
            !(checkIfGameWon && typeof checkIfGameWon === "function") ||
            !(isNextMoveNotPossible && typeof isNextMoveNotPossible === "function") ||
            !(gameWonRenderer && typeof gameWonRenderer === "function") ||
            !(gameLostRenderer && typeof gameLostRenderer === "function") ||
            !(actions && typeof actions === "object")
        ) {
            errorTypes.INVALID_PARAMS();
        }

        this.getGameState = getGameState;
        this.performAction = performAction;
        this.actions = actions;
        this.getGameGoal = getGameGoal;
        this.activateUserInputListener = activateUserInputListener;
        this.addNumberToBoard = addNumberToBoard;
        this.renderGameBoard = renderGameBoard;
        this.checkIfGameWon = checkIfGameWon;
        this.isNextMoveNotPossible = isNextMoveNotPossible;
        this.gameWonRenderer = gameWonRenderer;
        this.gameLostRenderer = gameLostRenderer;
        
        initiateDataModel(gameGoal, parseInt(gameBoardSize[0]));
        this._nextTurn();
    },
    /* 
        @description: Set the game for the next turn
        @return {undefined}
    */
    _nextTurn() {
        this.renderGameBoard(this.getGameState(), this.getGameGoal());
        this.activateUserInputListener(this.handleUserInput.bind(this), this.validInputs);
    },
    /* 
        @description: A callback function for handling user input.
        @param {string} userInput: The user input registered. Can be "TOP", "LEFT", "BOTTOM", and "RIGHT" based on the users
        @returns {undefined}
    */
    handleUserInput(userInput) {
        switch (userInput) {
            case "TOP":
                this.performAction(this.actions.UP);
                break;
            case "BOTTOM":
                this.performAction(this.actions.DOWN);
                break;
            case "LEFT":
                this.performAction(this.actions.LEFT);
                break;
            case "RIGHT":
                this.performAction(this.actions.RIGHT);
                break;
        
            default:
                console.log("Invalid Input");
                break;
        }
        if(this.checkIfGameWon()) {
            this.renderGameBoard(this.getGameState(), this.getGameGoal());
            this.gameWonRenderer();
            process.exit();
        }

        if(this.isNextMoveNotPossible()) {
            this.renderGameBoard(this.getGameState(), this.getGameGoal());
            this.gameLostRenderer();
            process.exit();
        }

        else {
            this.addNumberToBoard();
            this._nextTurn();
        }
    }
};

module.exports = {
    init: game_controller.init.bind(game_controller),
}