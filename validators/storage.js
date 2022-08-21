const {check, validationResult} = require("express-validator");
const validationResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("myfile")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
    
];

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
    
];

module.exports = {validatorCreateItem, validatorGetItem};
