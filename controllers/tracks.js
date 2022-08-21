const { matchedData } = require("express-validator");
const {tracksModel} = require('../models');
const { handleHttpError } = require('../utils/handleError');


/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {

    try {
        
        const data = await tracksModel.find({});
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 500);
        
    }

};
/**
 * obtener un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM", 404)
    }
};

/**
 * insertar un registro en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS', 500);
    }

};
/**
 * actualizar un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) =>  {
try {
    const {id, ...body} = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(
        id, body
    );
    res.send({data});
    } catch (e) {
    handleHttpError(res, 'ERROR_ACTUALIZAR_ITEM', 500);
    };
}
/**
 * borrar un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const data = await tracksModel.delete({_id:id});
        res.send({data});
        } catch (e) {
        handleHttpError(res, 'ERROR_AL_BORRAR_ITEM', 500);
        };
};


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };