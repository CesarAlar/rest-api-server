import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
// va a tener una interfaz que va a tener toda la documentacion
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
// import {swaggerUiOptions} from "./config/swagger"; para editar el aspecto de swagger

// conectar a la base de datos
async function connectDB() {
    try {
        // esperamos a que se haga la coneccion a la bd
        await db.authenticate() //nos autenticamos en la base de datos 
        // si todo esta bien usamos sync para en caso de que vallamos creando nuevos modelos, columnas, etc las valla agregando
        db.sync()
        // console.log(colors.green('conexion exitosa'))
    } catch (error) {
        console.log(colors.bgRed.white('hay un error en la conexion de la base de datos'))
    }
}
connectDB()
// instancia de express
const server = express()
// usar cors permitir conexiones
const corsOptions : CorsOptions = {
    origin:function (origin, callback) {
        if(origin !== process.env.FRONTEND_URL){
            callback(new Error('Error de CORS'))
        }
        callback(null, true)
    }
}
server.use(cors(corsOptions))
// leer datos de formularios
server.use(express.json()) //esto nos va a permitir leer las respuestas json que son mandadas a los post por medio de req.body
// morgan te da mas detalles de las peticiones que se estan dando
server.use(morgan('dev'))
// routing y un metodo que engloba todos los metodos del router es use y se ejecuta en cada uno de ellos
server.use('/api/products', router) //se le pasa la ruta y luego el handler o las funciones del router 

// swagger v a a crear un cliente en una url para ver la documentacion 
server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// aqui se agrega swaggerUiOptions para editar swagger
// server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server