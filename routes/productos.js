const express = require('express');
const router = express.Router();

//const productosModel = require("../models/productos_PostgrestSQL");
const productosModel = require("../models/productos_SQLite");



router.get('/', function (req, res, next) {
    productosModel.obtener()
    .then(productos => {
            //console.log(productos)
            res.render("productos/ver", {
                productos: productos,
            });
        })
        .catch(err => {
            console.log(err);
            console.log("Error ")
            return res.status(500).send("Error obteniendo productos");
        });
});
router.get('/agregar', function (req, res, next) {
    res.render("productos/agregar");
});
router.post('/insertar', function (req, res, next) {
    console.log(req.body.nombre)
    console.log(req.body.descripcion)
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(500).send("No hay nombre de empresa o descripcion");
    }
    // Si todo va bien, seguimos
    productosModel
        .insertar(nombre, descripcion)
        .then(idProductoInsertado => {
            console.log(idProductoInsertado)
            res.redirect("/productos");
        })
        .catch(err => {
            console.log("err")
            return res.status(500).send("Error insertando empresa");
        });
        console.log("Sale")
});
router.get('/eliminar/:id', function (req, res, next) {
    productosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    productosModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                res.render("productos/editar", {
                    producto: producto,
                });
            } else {
                return res.status(500).send("No existe producto con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, nombre, descripcion } = req.body;
    if (!nombre || !descripcion || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos
    productosModel
        .actualizar(id, nombre, descripcion)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});

module.exports = router;
