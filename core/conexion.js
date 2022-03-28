const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tienda",
  password: "Desarrollo",
  port: 5432,
});
module.exports = pool;
