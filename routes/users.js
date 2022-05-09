const express = require('express');
const router = express.Router();
const { crearProducto, vistaProductos, vistaUnProducto, editarProducto, borrarProducto, consultaAxios } = require("../controller/controller");
const { check, validationResult, body } = require("express-validator");

router.get("/ver", vistaProductos); /* Ver todos los prodcutos de la base*/
router.get("/rick", consultaAxios); /* Consulta axios a una Api externa*/
router.get("/ver/:id", vistaUnProducto);
router.post("/crear", [
    check("name").not().isEmpty().isLength({ max: 15, min: 4 }).withMessage("El nombre debe tener entre 4 y 15 caracteres")],
    crearProducto);/* Crear producto con condiciones*/
router.put("/editar/:id", editarProducto); /* Editar producto solo el nombre*/
router.delete("/eliminar/:id", borrarProducto) /* Eliminar producto por ID*/

module.exports = router;
