const gameController = require("./src/game_controller/game_controller.module");
const gameDataModel = require("./src/data_model/data_model.module");
const gameUI = require("./src/views/game_ui.module");
const userInputInterface = require("./src/views/user_input_interface.module");

const {errorHandler} = require("./src/utils/error_handler.module");

const config = {
    gameGoal:                   2048,
    gameBoardSize:              "4x4",
    initiateDataModel:          gameDataModel.init,
    getGameState:               gameDataModel.getGameState,
    performAction:              gameDataModel.performAction,
    renderGameBoard:            gameUI.renderGameBoard,
    activateUserInputListener:  userInputInterface.activateInputListener,
    notifyInvalidUserInput:     userInputInterface.notifyInvalidInput,
    actions:                    gameDataModel.actions,
    getGameGoal:                gameDataModel.getGameGoal
};


try {
    gameController.init(config);
}
catch(error) {
    errorHandler(error);
}
