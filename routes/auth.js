const express = require("express");
const router = express.Router();
const {registerCtrl, loginCtrl} = require("../controllers/auth")
const {tokenSign} = require("../utils/handlejwt")
const {encrypt, compare} = require("../utils/handlePassword");
const {usersModel} = require("../models")
const { matchedData } = require("express-validator");
const {validatorLogin, validatorRegisterItem} = require("../validators/auth");
/**
 * Crea los Items
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Registar nuevo usuario"
 *          description: "esta ruta permite registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: Usuario registrado de manera correcta
 *                  '403':
 *                      description: Error por validacion de usuario
 *                  '200':
 *                      description: Usuario Registrado
 *                      
 * 
 * 
 * 
 * */        
router.post("/register", validatorRegisterItem, registerCtrl);
 
/**
 * Permite el Login
 */
router.post("/login", validatorLogin, loginCtrl);


module.exports = router;
