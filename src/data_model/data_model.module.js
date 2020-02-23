const { errorTypes } = require("../utils/error_handler.module");

data_model = {
    state: {
        gameBoardSize: null,            // A number representing the row/column size of the board.
        gameGoal: null,                 // A number representing the end goal number of the game. Must be a power of 2. 
    },
    actions: {
        "UP": "MERGE_UP",
        "LEFT": "MERGE_LEFT",
        "DOWN": "MERGE_DOWN",
        "RIGHT": "MERGE_RIGHT",
    },    
    /* 
        @param {number} gameGoal:       The end goal of the game. Must be a power of 2. 
        @param {string} gameBoardSize:  The size of the game board written in "NxN" format, 
                                        where N is the number of rows/columns.
        @returns {undefined}
    */
    init(gameGoal, gameBoardSize) {
        
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

    }
};

module.exports = {
    init:           data_model.init.bind(data_model),
    performAction:  data_model.performAction.bind(data_model),
    getBoardState:  data_model.getBoardState.bind(data_model),
    actions:        data_model.actions,
}