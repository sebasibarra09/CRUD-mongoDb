const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Product } = require('../models/model');

const vistaUno = (req, res) => {
    res.render('index', { title: 'Express' });
}

const vistaProductos = async (req, res) => {

    const producto = await Product.find()
    res.json({ producto })
}


const vistaUnProducto = async (req, res) => {
    const producto = await Product.findById(req.params.id)
    res.json({ producto })
}

const crearProducto = async (req, res) => {
    console.log(validationResult(req))
    console.log(req.body)

    try {
        const error = validationResult(req)
        if (error.isEmpty()) {
            const { name, price } = req.body
            const producto = new Product({ name, price });
            await producto.save()
            res.status(201).json({ producto, msg: "Agregado" })
        } else {
            res.status(400).json(error)
        }
    } catch (err) {
        res.status(400).json({ msg: "Este nombre ya existe", err })
    }
}

const editarProducto = async (req, res) => {
    const { id } = req.params
    const name = req.body.name
    console.log(req.body)
    await Product.findByIdAndUpdate(id, req.body)
    res.status(201).json(name)
}

const borrarProducto = async (req, res) => {
    const producto = await Product.findByIdAndDelete(req.params.id)
    res.json({ msg: "Eliminado", producto })
}

const consultaAxios = async (req, res) => {
    const resultado = await axios.get("https://rickandmortyapi.com/api/character/784", { timeout: 10000 }).catch((err) => {
        err.origin = 'Error buscando a Morty';
        throw err;
    });
    res.json(resultado.data.image)
}

module.exports = { vistaUno, vistaProductos, vistaUnProducto, crearProducto, editarProducto, borrarProducto, consultaAxios }