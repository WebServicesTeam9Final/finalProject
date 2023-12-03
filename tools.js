function log(message = "") {
    if (process.env.npm_lifecycle_event !== "test") {
        console.log(message);
    } else {
        return true;
    }
}

function info(message = "") {
    if (process.env.npm_lifecycle_event !== "test") {
        console.info(message);
    } else {
        return true;
    }
}

module.exports = {
    log,
    info
};
