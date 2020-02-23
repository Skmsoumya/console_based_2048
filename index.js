const gameController = require("./src/game_controller/game.controller");
const gameDataModel = require("./src/data_model/data.model");
const gameUI = require("./src/views/game_ui.view");
const userInputInterface = require("./src/views/user_input_interface.view");
const gameWonUI = require("./src/views/game_won.view");
const gameLostUI = require("./src/views/game_lost.view");

const {errorHandler} = require("./src/utils/error_handler.module");

const config = {
    gameGoal:                   2048,
    gameBoardSize:              "4x4",
    initiateDataModel:          gameDataModel.init,
    getGameState:               gameDataModel.getGameState,
    performAction:              gameDataModel.performAction,
    renderGameBoard:            gameUI.renderGameBoard,
    activateUserInputListener:  userInputInterface.activateInputListener,
    addNumberToBoard:           gameDataModel.randomAddANumber,
    actions:                    gameDataModel.actions,
    getGameGoal:                gameDataModel.getGameGoal,
    checkIfGameWon:             gameDataModel.checkIfGameWon,
    isNextMoveNotPossible:      gameDataModel.isNextMoveNotPossible,
    gameWonRenderer:            gameWonUI.render,
    gameLostRenderer:           gameLostUI.render,
};


try {
    gameController.init(config);
}
catch(error) {
    errorHandler(error);
}
