const readline = require("readline");

const user_input_interface = {
    /* 
        @description: Setup listeners for user input.

        @param {function} handleUserInput: A callback function for handling user's input.

        @returns {undefined}
    */
    init(handleUserInput) {
        
    }
};

module.exports = {
    init: user_input_interface.init.bind(user_input_interface),
};