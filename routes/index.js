const express = require('express');
const router = express.Router();
const { vistaProductos } = require('../controller/controller.js')

/* GET home page. */
router.get('/', vistaProductos);

module.exports = router;
