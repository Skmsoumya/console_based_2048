const prompt = require("prompt");
const {errorHandler} = require("../utils/error_handler.module");

const user_input_interface = {
    /* 
        @description: A function to ask input from user.

        @returns {string}: The users input.
    */
    _askInputFromUser() {
        return new Promise((resolve, reject) => {
            prompt.start();

            prompt.get([{
                name: "userMove",
                required: true,
                description: "Enter your next move:",
                message: "Move can only be 1, 2, 3, and 4",
                conform: (value) => {
                    return (
                        value === "1" ||
                        value === "2" ||
                        value === "3" ||
                        value === "4"
                    );
                }
            }], (err, result) => {

                if(err) {
                    reject(err);
                    return;
                }
                
                resolve(result.userMove);
            })
        });
    },  
    /* 
        @description: Listen to user inputs

        @param {function} handleUserInput: A callback function for handling user's input.
        @param {object} validInputs: A dictionary of all the valid inputs for the game.

        @returns {undefined}
    */
    activateInputListener(handleUserInput, validInputs) {
        console.log(`

        --------

        How To Play:

        Use the keys 1,2,3,4 to move the tiles. When two tiles 
        of same number touch, they merge into one!

                1
                ^
                |
            2<-- -->3
                |
                V
                4
        
        --------

        `);

        this._askInputFromUser().then((userInput) => {
            switch (userInput) {
                case "1":
                    handleUserInput(validInputs.TOP);
                    break;
                    
                case "2":
                    handleUserInput(validInputs.LEFT);
                    break;
                    
                case "3":
                    handleUserInput(validInputs.RIGHT);
                    break;

                case "4":
                    handleUserInput(validInputs.BOTTOM);
                    break;
                    
                default:
                    console.log("Invalid Input");
            }
        }).catch((err) => {
            errorHandler(err);
        });
    }
};

module.exports = {
    activateInputListener:  user_input_interface.activateInputListener.bind(user_input_interface)
};