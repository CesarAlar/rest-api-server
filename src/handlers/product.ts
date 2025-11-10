import type {Request,Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req:Request,res: Response) => {
    // buscar el producto en la base de datos
    const product = await Product.findAll({
        order:[['id','DESC']]
    })
    res.json({data:product})
     
}

export const getProductById = async (req:Request,res: Response) => {
    // accedemos al id 
    const {id} = req.params
    // buscamos el producto por el id
    const producto = await Product.findByPk(id)
    if (!producto) {
        return res.status(404).json({error:'Producto no encontrado'})
    }
    res.json({data:producto})
}

export const createProduct = async (req:Request,res: Response) => {
    // creamos el objeto que se enviara a la base de datos, de nuevo se tiene que configurar el tsconfig con "target": "esnext",
    // "moduleResolution": "nodenext","module": "nodenext", 
        // primera forma
        // const product = new Product(req.body)
        // product.save()
        // segunda forma y lo almacenamos en la base de datos 
    const product = await Product.create(req.body)

    res.status(201).json({data:product})
}

export const updateProduct = async (req:Request,res: Response) => {
    // accedemos al id 
    const {id} = req.params
    // buscamos el producto por el id
    const producto = await Product.findByPk(id)
    if (!producto) {
        return res.status(404).json({error:'Producto no encontrado'})
    }
    // recuperar los datos console.log(req.body)
    // actualizamos y luego guardamos cambios
    await producto.update(req.body)
    // guardar cambios
    await producto.save()
    res.json({data:producto})
}

export const updateAvailability = async (req:Request,res: Response) => {
    const {id} = req.params
    const producto = await Product.findByPk(id)
    if (!producto) {
        return res.status(404).json({error:'Producto no encontrado'})
    }
    // producto.availability = !producto.availability
    // dataValues lee los valores de availability
    producto.availability = !producto.dataValues.availability
    await producto.save()
    res.json({data:producto})
}

export const deleteProduct = async (req:Request,res: Response) => {
    const {id} = req.params
    const producto = await Product.findByPk(id)
    if (!producto) {
        return res.status(404).json({error:'Producto no encontrado'})
    }
    
    await producto.destroy()
    res.json({data:'Producto Eliminado'})
}