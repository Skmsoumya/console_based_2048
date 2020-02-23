module.exports = {
    errorHandler: (error) => {
        console.log(error);
    },
    errorTypes: {
        "INVALID_PARAMS": () => {
            throw new Error("INVALID_PARAMS");
        },

    }
}