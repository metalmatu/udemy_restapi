const {handleHttpError} = require("../utils/handleError");
const {usersModel} = require("../models");
const {verifyToken} = require("../utils/handlejwt");

const authMiddleware = async (req, res, next) => {
    try {

    if(!req.headers.authorization){
        handleHttpError(res, "NOT_TOKEN", 401);
        return
    }
    
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);
    console.log(token);
    console.log(dataToken);
    if(!dataToken){
        handleHttpError(res, "ERROR_ID_TOKEN", 401);
        return
    }
    
    const user = await usersModel.findById(dataToken._id)
    req.user = user
    
    next()

    } catch (error) {
        handleHttpError(res, "ERROR DE AUTORIZACION", 401)
    }   
};

module.exports = authMiddleware;