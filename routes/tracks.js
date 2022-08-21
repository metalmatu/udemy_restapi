const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
// http://localhost/tracks GET, POST, DELETE, PUT

/**
 * Lista los Items
 */
router.get("/",authMiddleware,validatorGetItem,getItems);
/**
 * Obtener detalle del Item
 */
 router.get("/:id", validatorGetItem, getItem);
/**
 * Crea los Items
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, customHeader,createItem);
/**
 * Actualizar un Registro
 */
router.put("/:id", validatorGetItem, validatorCreateItem, customHeader, updateItem);

/**
 * Eliminar Registro por ID
 */
 router.delete("/:id", validatorGetItem, customHeader, deleteItem);


module.exports = router
