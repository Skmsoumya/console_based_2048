module.exports = {
    errorHandler: (error) => {
        switch (error.message) {
            case "INVALID_PARAMS":
                console.error("Invalid parameters passed to controller.");
                console.error(err);
                break;
            case "canceled":
                console.error("Thank you for playing the game.");
                break;
            default:
                console.error(error);
                break;
        }
    },
    errorTypes: {
        "INVALID_PARAMS": () => {
            throw new Error("INVALID_PARAMS");
        },

    }
}