// importamos los decoradores que sirven para crear el modelo de la base de datos
import {Table,Column,Model,DataType, Default} from 'sequelize-typescript'

// decoradores y debes configurar el tsconfig para que ts reconosca los decoradores con "experimentalDecorators": true,
// "emitDecoratorMetadata": true
@Table({
    tableName:'products'
})
// en model es una clase que podemos heredar y en ella podemos reescribir y definir los modelos
class Product extends Model{
    // en el modelo definimos los atributos que va a tener el producto
    @Column({
        // podemos poner el tipo de dato y extencion de las columnas
        type: DataType.STRING(100)
    })
    declare name:string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number
    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
} 

export default Product