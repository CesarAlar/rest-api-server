// limpiar la base de datos cada que termine las pruevas o test 
// importamos exit, que detiene la ejecucion de un codigo de node
import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force:true}) // así elimina los datos de la base de datos 
        console.log('datos eliminados')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1) //el uno significa que el programa finaliza con errores y con 0 significa que termino sin errores
    }
}

if (process.argv[2] === '--clear') { //el --clear se va a encontrar en el comando del package.json a la hora de ejecutarlo, lo identifica y limpia la base de datos
    clearDB()
}