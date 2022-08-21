const bscryptjs = require("bcryptjs");

/**
 * Contraseña sin Encriptar
 * @param {*} passwordPlain 
 */

const encrypt = async (passwordPlain) => {
    const hash = await bscryptjs.hash(passwordPlain, 10)
    return hash
};

/**
 * Pasar Contraseña sin Encriptar
 * @param {*} passwordPlain 
 * Pasar Contraseña Encriptada
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bscryptjs.compare(passwordPlain, hashPassword)

};

module.exports = { encrypt, compare };