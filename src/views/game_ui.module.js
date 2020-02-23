const game_ui = {
    /* 
        @description: A function to get the decorated game board string for display

        @param {array} gameState: A matrix representing the game state.
    */
    _getDecoratedGameBoard(gameState) {
        let decoratedGameBoard = '\n\n';

        for(let i = 0; i < gameState.length; i++) {
            decoratedGameBoard = decoratedGameBoard + '\t';
            for(let j = 0; j < gameState.length; j++) {
                let nodeValue = gameState[i][j] ? `${gameState[i][j]}` : "-";
                decoratedGameBoard = decoratedGameBoard + '  ' + nodeValue;
            }
            decoratedGameBoard = decoratedGameBoard + '\n';
        }
        return decoratedGameBoard + '\n';
    },
    /* 
        @description: A function to render the game board UI based on game state.
        @param {array} gameState: A matrix representing the game state.
        @param {number} gameGoal: The end goal number of the game.

        @return {undefined}

    */
    renderGameBoard(gameState, gameGoal) {
        console.clear();
        console.log(
            `
        ${gameGoal} Game
        ---------
        Join the numbers and get to ${gameGoal} tile!

        --------

        How To Play:

        Use the keys 1,2,3,4 to move the tiles. When two tiles 
        of same number touch, they merge into one!

        --------
        
        Your Game Board:

        ${this._getDecoratedGameBoard(gameState)}

            `
        )
    }
};

module.exports = {
    renderGameBoard: game_ui.renderGameBoard.bind(game_ui),
};