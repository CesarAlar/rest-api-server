// importaas una instancia del server que se llama Router
import {Router} from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import {body, param} from 'express-validator'
import { manejoDeErrores } from './Middlewares'
const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product id
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor nuevo
 *                  price:
 *                      type: integer
 *                      description: The product price
 *                      example: 100
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true/false
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: get a list of products
 *          tags:
 *              - Products
 *          description: return a list of products
 *          responses:
 *              200:
 *                  description: succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)
// aplicar el routing dinamico de express =  /:id
// validar que el parametro sea un entero 

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: get a product by id
 *          tags:
 *              - Products
 *          description: return a product based on its unique id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: not found
 *              400:
 *                  description: bad request - invalid id
 *                  
 */
router.get('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    manejoDeErrores,
    getProductById)

/**
 * @swagger
 *  /api/products:
 *   post:
 *      summary: creates a new product
 *      tags:
 *          - Products
 *      description: returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: monitor nuevo prueva
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses: 
 *              200:
 *                  description: Product created succerfully
 *              400:
 *                  description: Bad request - invalid input data
 */

router.post('/',
    body('name').notEmpty().withMessage('Este campo no puede ir vacio'), 
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('Este campo no puede ir vacio')
    .custom(value => value > 0).withMessage('precio no valido'),
manejoDeErrores, 
createProduct)

/**
 * @swagger
 *  /api/products/{id}:
 *   put:
 *      summary: updates aproduct with user input
 *      tags:
 *          - Products
 *      description: returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: monitor nuevo prueva
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: bad request - invalid id or invalid input data
 *          404:
 *              description: product no found
 */

// put reemplaza todo con lo que le mandes, se usa para actualizar o reemplazar completamente un recurso existente en un servidor web
router.put('/:id',
    param('id').isInt().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('Este campo no puede ir vacio'), 
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('Este campo no puede ir vacio')
    .custom(value => value > 0).withMessage('precio no valido'),
    body('availability').isBoolean().withMessage('valor para disponibilidad no valido'),
manejoDeErrores,
updateProduct)

/**
 * @swagger
 *  /api/products/{id}:
 *   patch:
 *      summary: updates aproduct availability
 *      tags:
 *          - Products
 *      description: returns the updated availability
 *      parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *      responses:
 *          200:
 *              description: succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: bad request - invalid id or invalid input data
 *          404:
 *              description: product no found
 */


// patch reemplaza solo lo que le estas enviando y se usa para hacer modificaciones parciales en un recurso existente en un servidor web
router.patch('/:id',
    param('id').isInt().withMessage('Id no valido'),
manejoDeErrores,
updateAvailability)

/**
 * @swagger
 *  /api/products/{id}:
 *   delete:
 *      summary: delete a aproduct
 *      tags:
 *          - Products
 *      description: delete a product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *      responses:
 *          200:
 *              description: succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'producto eliminado'
 *          400:
 *              description: bad request - invalid id or invalid input data
 *          404:
 *              description: product no found
 */

router.delete('/:id',
    param('id').isInt().withMessage('Id no valido'),
    manejoDeErrores,
    deleteProduct
)

export default router