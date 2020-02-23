module.exports = {
    errorHandler: (error) => {
        console.log(error);
        switch (error.type) {
            case "INVALID_PARAMS":
                console.error("invalid Params Passed");
                console.error(err);
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