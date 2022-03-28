const sqlite = require("aa-sqlite")
const conexion = require("../core/conexion")


module.exports = {
    async insertar(nombre, descripcion) {
        await sqlite.open('./db/DB_Node.db') 
        var sql = (`insert into tienda  (nombre, descripcion) values (\"`+nombre+`\", \"`+descripcion+`\")`)
        r = await sqlite.run(sql)
        return r
    },
    async obtener() {
        let resp = []
        await sqlite.open('./db/DB_Node.db') 
        var sql = "select *  FROM tienda"
        r = await sqlite.each(sql, [], function(row) {
            resp.push(row)
        })
        return resp
    },
    async obtenerPorId(id) {
        let resp = []
        console.log(id)
        await sqlite.open('./db/DB_Node.db') 
        var sql = (`select *  from tienda  where id=`+id)
        r = await sqlite.each(sql, [], function(row) {
            resp.push(row)
        })
        return resp[0]
    },
    async actualizar(id, nombre, descripcion) {

        console.log(id)
        await sqlite.open('./db/DB_Node.db') 
        var sql = (`UPDATE tienda SET nombre = \"`+nombre+`\",descripcion = \"`+descripcion+`\"  WHERE id =`+id)
        r = await sqlite.run(sql)
        return r


        // const resultados = conexion.query(`update productos
        // set nombre = $1,
        // descripcion = $2
        // where id = $3`, [nombre, descripcion, id]);
        // return resultados;
    },
    async eliminar(id) {
        console.log(id)
        await sqlite.open('./db/DB_Node.db') 
        var sql = (`delete from tienda where id = `+id)
        r = await sqlite.run(sql)
        return r

    },
}







