const conexion = require("../core/conexion")
module.exports = {
    async insertar(nombre, descripcion) {
        console.log("insertar",nombre, descripcion )
        let resultados = await conexion.query(`insert into productos
        (nombre, descripcion)
        values
        ($1, $2)`, [nombre, descripcion]);
        return resultados;
    },
    async obtener() {
        const resultados = await conexion.query("select id, nombre, descripcion from productos");
        return resultados.rows;
    },
    async obtenerPorId(id) {
        const resultados = await conexion.query(`select id, nombre, descripcion from productos where id = $1`, [id]);
        return resultados.rows[0];
    },
    async actualizar(id, nombre, descripcion) {
        const resultados = conexion.query(`update productos
        set nombre = $1,
        descripcion = $2
        where id = $3`, [nombre, descripcion, id]);
        return resultados;
    },
    async eliminar(id) {
        const resultados = conexion.query(`delete from productos
        where id = $1`, [id]);
        return resultados;
    },
}