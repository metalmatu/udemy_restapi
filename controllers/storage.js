const fs = require("fs");
const {storageModel} = require('../models');
const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({data});   
    } catch (error) {
        handleHttpError(res, 'ERROR_AL_LISTAR_ITEM', 500);
    }
};
/**
 * obtener un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>  {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await storageModel.findById(id);
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
        const {body, file} = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_AL_INSERTAR_ITEM', 500);
    }
    

};
/**
 * actualizar un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req);
        const data = await storageModel.findOneAndUpdate(
            id, body
        );
        res.send({data});
        } catch (e) {
        handleHttpError(res, 'ERROR_ACTUALIZAR_ITEM', 500);
        };
    };

/**
 * borrar un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        console.log(id);
        const dataFile = await storageModel.findById(id);
        console.log(dataFile);
        await storageModel.delete({_id:id});
        const {filename} = dataFile;
        const filepath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filepath);
        const data = {
            filepath,
            deleted:1
        };
        res.send({data});
        } catch (e) {
        handleHttpError(res, 'ERROR_AL_BORRAR_ITEM', 500);
        };
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };