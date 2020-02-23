const { errorTypes } = require("../utils/error_handler.module");

data_model = {
    state: {
        gameBoardSize: null,            // A number representing the row/column size of the board.
        gameGoal: null,                 // A number representing the end goal number of the game. Must be a power of 2. 
        game: null,                     // The game board state.
        occupiedPositions: {}           // Map of all occupied positions of the game board. Properties in row_col format
    },
    actions: {
        "UP": "MERGE_UP",
        "LEFT": "MERGE_LEFT",
        "DOWN": "MERGE_DOWN",
        "RIGHT": "MERGE_RIGHT",
    },
    /* 
        @description:                   Setup the game board.
        @param {number} gameBoardSize:  The size of the game board.
        @return {array}:                A matrix with all elements initialized as zero.
    */  
    _getAInitialGameMatrix(gameBoardSize) {
        let game = [];
        for(let i = 0; i < gameBoardSize; i++) {
            game.push(new Array(gameBoardSize));
        }
        return game;
    },
    /* 
        @description: A function to get an random unoccupied position.
        @return {object}:          A object with the row and column of unoccupied position.
            @properties:
                - {number} row: The Unoccupied row number.
                - {number} col: The Unoccupied column number.
    */
    _getARandomUnOccupiedPosition() {
        let col = Math.floor(Math.random() * this.state.gameBoardSize);
        let row = Math.floor(Math.random() * this.state.gameBoardSize);
        
        if(this.state.occupiedPositions.hasOwnProperty(`${row}_${col}`)) {
            return this._getARandomUnOccupiedPosition();
        }
        else {
            return {
                row,
                col
            };
        }
    },
    /* 
        @description:               Random add twos and Fours to a random unoccupied location on the game board.
        @return {undefined}
    */
    _randomAddTwosFours() {
        let {
            col: randomUnOccupiedColumn,
            row: randomUnOccupiedRow
        } = this._getARandomUnOccupiedPosition();
        let randomNumberToAdd = Math.ceil(Math.random() * 2) * 2;
        this.state.game[randomUnOccupiedRow][randomUnOccupiedColumn] = randomNumberToAdd;
        this.state.occupiedPositions[`${randomUnOccupiedRow}_${randomUnOccupiedColumn}`] = randomNumberToAdd;
    },
    /* 
        @description:               Function to add the initial two random (2 or 4) to the board at random position.
        @return {undefined}
    */
    _addInitialNumbers() {
        this._randomAddTwosFours();
        this._randomAddTwosFours();
    },
    /* 
        @param {number} gameGoal:       The end goal of the game. Must be a power of 2. 
        @param {string} gameBoardSize:  The size of the game board written in "NxN" format, 
                                        where N is the number of rows/columns.
        @returns {undefined}
    */
    init(gameGoal, gameBoardSize) {
        this.state.gameGoal = gameGoal;
        this.state.gameBoardSize = gameBoardSize;
        this.state.game = this._getAInitialGameMatrix(this.state.gameBoardSize);
        this.state.occupiedPositions = {};

        this._addInitialNumbers();
    },
    /* 
        @description: Perform the specified action on the game board.
        @params {string} action: The action to be performed. 
        @returns {undefined}
    */
    performAction(action) {
        
    },
    /* 
        @description: Get the current board state represented by a matrix.
        
        @returns {array} A matrix representation of the current state of game board.
    */
    getBoardState() {
        return this.state.game;
    }
};

module.exports = {
    init:           data_model.init.bind(data_model),
    performAction:  data_model.performAction.bind(data_model),
    getBoardState:  data_model.getBoardState.bind(data_model),
    actions:        data_model.actions,
}