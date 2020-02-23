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
    actionToFunctionMap: {
        MERGE_UP: "_mergeGameUp",
        MERGE_LEFT: "_mergeGameLeft",
        MERGE_DOWN: "_mergeGameDown",
        MERGE_RIGHT: "_mergeGameRight"
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
        @description: Merge the game board towerds the top
        @return {undefined}
    */
    _mergeGameUp() {
        const currentGameState = this.state.game;
        for(let i = 0; i < this.state.gameBoardSize; i++) {
            let lastEncounteredVal = null;
            let lastEncounteredValPos = null;
            let emptyPosQueue = [];

            for(let j = 0; j < this.state.gameBoardSize; j++) {
                
                let currentVal = currentGameState[j][i];
                let rowPos = j;
                let colPos = i;

                if(currentGameState[j][i]) {
                    if(lastEncounteredVal && lastEncounteredVal === currentVal) {
                        delete this.state.occupiedPositions[`${rowPos}_${colPos}`];
                        currentGameState[rowPos][colPos] = undefined;

                        emptyPosQueue.push({
                            row: rowPos,
                            col: colPos
                        });

                        lastEncounteredVal = lastEncounteredVal + currentVal;
                        currentGameState[lastEncounteredValPos.row][lastEncounteredValPos.col] = lastEncounteredVal;
                    }
                    else {
                        if(emptyPosQueue.length) {
                            let pos = emptyPosQueue.shift();
                            currentGameState[pos.rowPos][pos.colPos] = currentVal;
                            this.state.occupiedPositions[`${pos.rowPos}_${pos.colPos}`] = currentVal;
                            
                            emptyPosQueue.push({
                                row: i,
                                col: j
                            });

                            rowPos = pos.rowPos;
                            colPos = pos.colPos;
    
                            currentGameState[j][i] = undefined;
                            delete this.state.occupiedPositions[`${j}_${i}`];
                        }

                        
                        lastEncounteredVal = currentVal;
                        lastEncounteredValPos = {
                            row: rowPos,
                            col: colPos
                        }
                    }
                    
                }
                else {
                    emptyPosQueue.push({rowPos: j, colPos: i});
                }
            }
        }
    },
    /* 
        @description: Merge the game board towards the left
        @return {undefined}
    */
    _mergeGameLeft() {
        const currentGameState = this.state.game;
        for(let i = 0; i < this.state.gameBoardSize; i++) {
            let lastEncounteredVal = null;
            let lastEncounteredValPos = null;
            let emptyPosQueue = [];

            for(let j = 0; j < this.state.gameBoardSize; j++) {
                
                let currentVal = currentGameState[i][j];
                
                let rowPos = i;
                let colPos = j;

                if(currentGameState[i][j]) {
                    if(lastEncounteredVal && lastEncounteredVal === currentVal) {
                        delete this.state.occupiedPositions[`${rowPos}_${colPos}`];
                        currentGameState[rowPos][colPos] = undefined;

                        emptyPosQueue.push({
                            row: rowPos,
                            col: colPos
                        });

                        lastEncounteredVal = lastEncounteredVal + currentVal;
                        currentGameState[lastEncounteredValPos.row][lastEncounteredValPos.col] = lastEncounteredVal;
                    }
                    else {
                        if(emptyPosQueue.length) {
                            let pos = emptyPosQueue.shift();
                            currentGameState[pos.rowPos][pos.colPos] = currentVal;
                            this.state.occupiedPositions[`${pos.rowPos}_${pos.colPos}`] = currentVal;

                            emptyPosQueue.push({
                                row: i,
                                col: j
                            });

                            rowPos = pos.rowPos;
                            colPos = pos.colPos;

                            currentGameState[i][j] = undefined;
                            delete this.state.occupiedPositions[`${i}_${j}`];
                        }

                        
                        lastEncounteredVal = currentVal;
                        lastEncounteredValPos = {
                            row: rowPos,
                            col: colPos
                        }
                    }
                    
                }
                else {
                    emptyPosQueue.push({rowPos: i, colPos: j});
                }
            }
        }
    },
    /* 
        @description: Merge the game board towards the bottom
        @return {undefined}
    */
    _mergeGameDown() {
        const currentGameState = this.state.game;
        for(let i = 0; i < this.state.gameBoardSize; i++) {
            let lastEncounteredVal = null;
            let lastEncounteredValPos = null;
            let emptyPosQueue = [];

            for(let j = this.state.gameBoardSize - 1; j >= 0; j--) {
                
                let currentVal = currentGameState[j][i];
                let rowPos = j;
                let colPos = i;

                if(currentGameState[j][i]) {
                    if(lastEncounteredVal && lastEncounteredVal === currentVal) {
                        delete this.state.occupiedPositions[`${rowPos}_${colPos}`];
                        currentGameState[rowPos][colPos] = undefined;

                        emptyPosQueue.push({
                            row: rowPos,
                            col: colPos
                        });

                        lastEncounteredVal = lastEncounteredVal + currentVal;
                        currentGameState[lastEncounteredValPos.row][lastEncounteredValPos.col] = lastEncounteredVal;
                    }
                    else {
                        if(emptyPosQueue.length) {
                            let pos = emptyPosQueue.shift();
                            currentGameState[pos.rowPos][pos.colPos] = currentVal;
                            this.state.occupiedPositions[`${pos.rowPos}_${pos.colPos}`] = currentVal;
                            
                            emptyPosQueue.push({
                                row: i,
                                col: j
                            });

                            rowPos = pos.rowPos;
                            colPos = pos.colPos;
    
                            currentGameState[j][i] = undefined;
                            delete this.state.occupiedPositions[`${j}_${i}`];
                        }

                        
                        lastEncounteredVal = currentVal;
                        lastEncounteredValPos = {
                            row: rowPos,
                            col: colPos
                        }
                    }
                    
                }
                else {
                    emptyPosQueue.push({rowPos: j, colPos: i});
                }
            }
        }
    },
    /* 
        @description: Merge the game board towards the right
        @return {undefined}
    */
    _mergeGameRight() {
        const currentGameState = this.state.game;
        for(let i = 0; i < this.state.gameBoardSize; i++) {
            let lastEncounteredVal = null;
            let lastEncounteredValPos = null;
            let emptyPosQueue = [];

            for(let j = this.state.gameBoardSize - 1; j >= 0 ; j--) {
                
                let currentVal = currentGameState[i][j];
                
                let rowPos = i;
                let colPos = j;

                if(currentGameState[i][j]) {
                    if(lastEncounteredVal && lastEncounteredVal === currentVal) {
                        delete this.state.occupiedPositions[`${rowPos}_${colPos}`];
                        currentGameState[rowPos][colPos] = undefined;

                        emptyPosQueue.push({
                            row: rowPos,
                            col: colPos
                        });

                        lastEncounteredVal = lastEncounteredVal + currentVal;
                        currentGameState[lastEncounteredValPos.row][lastEncounteredValPos.col] = lastEncounteredVal;
                    }
                    else {
                        if(emptyPosQueue.length) {
                            let pos = emptyPosQueue.shift();
                            currentGameState[pos.rowPos][pos.colPos] = currentVal;
                            this.state.occupiedPositions[`${pos.rowPos}_${pos.colPos}`] = currentVal;

                            emptyPosQueue.push({
                                row: i,
                                col: j
                            });

                            rowPos = pos.rowPos;
                            colPos = pos.colPos;

                            currentGameState[i][j] = undefined;
                            delete this.state.occupiedPositions[`${i}_${j}`];
                        }

                        
                        lastEncounteredVal = currentVal;
                        lastEncounteredValPos = {
                            row: rowPos,
                            col: colPos
                        }
                    }
                    
                }
                else {
                    emptyPosQueue.push({rowPos: i, colPos: j});
                }
            }
        }
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
        this[this.actionToFunctionMap[action]]();
    },
    /* 
        @description: Get the current board state represented by a matrix.
        
        @return {array} A matrix representation of the current state of game board.
    */
    getGameState() {
        return this.state.game;
    },
    /* 
        @description: A function to get the game goal number.

        @return {number}: The number for the game goal.
    */
    getGameGoal() {
        return this.state.gameGoal;
    }
};

module.exports = {
    init:           data_model.init.bind(data_model),
    performAction:  data_model.performAction.bind(data_model),
    getGameState:   data_model.getGameState.bind(data_model),
    getGameGoal:    data_model.getGameGoal.bind(data_model),
    actions:        data_model.actions,
}