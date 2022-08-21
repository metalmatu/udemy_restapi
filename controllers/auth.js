const {matchedData} = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword");
const {tokenSign} = require("../utils/handlejwt");
const {usersModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");

/**
 * Este Controlador es el Encargado de Registrar un Usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, {strict: false });
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
        res.send({data});
        
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER", 500)
    }
};
/**
 * Este Cpntrolador es el encargado del Login
 * @param {*} req 
 * @param {*} res 
 */
/*
const loginCtrl = async (req,res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email}).select('password name role email');
        if(user===null){
            console.log(user)
           // handleHttpError(res, "USER_NOT_EXIST", 404)    
            return
        }
        const hashPassword = user.get('password');
        console.log(hashPassword);
        const check = await compare(req.password, hashPassword)
        console.log(check);
        if(!check){
            console.log(check);
           // handleHttpError(res, "PASSWORD_INVALID", 401)
           // console.log(handleHttpError)
            return
        }

        const data = {
            token:tokenSign(user),
            user
        }
        res.send({data})

    } catch (error) {
       // handleHttpError(res, "ERROR_LOGIN_USER", 500)
       return null
    }
};
*/
const loginCtrl = async (req, res) => {
    try{
      req = matchedData(req);
      const user = await usersModel.findOne({email:req.email}).select('password')
  
      if(!user){
        handleHttpError(res, "USER_NOT_EXISTS", 404);
        return
      }
  
      const hashPassword = user.get('password');
  
      const check = await compare(req.password, hashPassword)
  
      if(!check){
        handleHttpError(res, "PASSWORD_INVALID", 401);
        return
      }
  
      user.set('password', undefined, {strict:false})
      const data = {
        token: await tokenSign(user),
        user
      }
  
      res.send({data})
  
  
    }catch(e){
      console.log(e)
      handleHttpError(res, "ERROR_LOGIN_USER")
    }
  }

module.exports = {registerCtrl, loginCtrl};
