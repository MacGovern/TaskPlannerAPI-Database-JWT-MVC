function isValidId(id) {
    return /^[1-9]\d*$/.test(id);
}

module.exports = { isValidId };