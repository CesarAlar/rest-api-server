import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
// de esta manera mandamos a llamar las variables de entorno 
dotenv.config()
// isntancia de Sequelize 
const db = new Sequelize(process.env.DB, {
    // aqui mandamos los modelos para que genere las columnas de la base de datos
    // models:[__dirname + '/../models/**/*.ts'],
    models:[__dirname + '/../models/**/*'],
    // impide que mande logs a consola
    logging: false
}) 
export default db
