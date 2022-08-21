const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const customHeader = require("../middleware/customHeader");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/storage");
const {validatorCreateItem, validatorGetItem} = require("../validators/storage");
// http://localhost/tracks GET, POST, DELETE, PUT


/**
 * Lista los Items
 */
 router.get("/",getItems);
 /**
  * Obtener detalle del Item
  */
  router.get("/:id", validatorGetItem, getItem);
 /**
  * Crea los Items
  */
  router.post("/",uploadMiddleware.single("myfile"), createItem);
 /**
  * Actualizar un Registro
  */
 router.put("/:id", validatorGetItem, validatorCreateItem, customHeader, updateItem);
 
 /**
  * Eliminar Registro por ID
  */
  router.delete("/:id", validatorGetItem, customHeader, deleteItem);
 
 
 module.exports = router;