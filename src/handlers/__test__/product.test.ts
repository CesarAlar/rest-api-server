import request from "supertest"
import server from "../../server"

describe('post /api/products', ()=>{
    it('should display validation errors/ mostrar errores de validacion',async()=>{
        // send es lo que vas a enviarle a ese endpoint 
        const respuesta = await request(server).post('/api/products').send({})
        expect(respuesta.status).toBe(400) 
        expect(respuesta.body).toHaveProperty('errors')
    })
    
    it('should validate that price is greater than 0/ validar que el precio es mayor a cero',async()=>{
        // send es lo que vas a enviarle a ese endpoint 
        const respuesta = await request(server).post('/api/products').send({
            name:'prueva test',
            price:0
        })
        expect(respuesta.status).toBe(400) 
        expect(respuesta.body).toHaveProperty('errors')
        
        expect(respuesta.status).not.toBe(404) 
    })

    it('should a new product/ debe crear un nuevo producto', async ()=>{
        // send es lo que vas a enviarle a ese endpoint 
        const respuesta = await request(server).post('/api/products').send({
            name:'producto test',
            price: 500
        }) 

        expect(respuesta.status).toBe(201)
        // que tenga la propiedad data
        expect(respuesta.body).toHaveProperty('data')
        
        expect(respuesta.status).not.toBe(404)
        expect(respuesta.status).not.toBe(200)
        expect(respuesta.body).not.toHaveProperty('errors')
        
    })
})

describe('GET api/products', ()=>{
    it('checar si la url /api/products existe', async ()=>{
        const respuesta = await request(server).get('/api/products')
        expect(respuesta.status).not.toBe(404)
    })
    it('GET a json response with products/ obtener una respuesta json con products', async ()=>{
        const respuesta = await request(server).get('/api/products')
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveProperty('data')
        expect(respuesta.headers['content-type']).toMatch(/json/)

        expect(respuesta.body).not.toHaveProperty('errors')
    })
})

describe('get /api/products/:id', ()=>{
    it('should check a valid id un the url/ checar que el id sea valido en la url', async () => {
        const respuesta = await request(server).get(`/api/products/not-valid-url`)
        expect(respuesta.status).toBe(400)
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.body.errors[0].msg).toBe('Id no valido')
    })
    it('get should return a 404 response for a non-existent product/ regresar un 404 si el producto no existe', async () => {
        const id = 5
        const respuesta = await request(server).get(`/api/products/${id}`)
        // en este caso esperamos como respuesta errores
        expect(respuesta.status).toBe(404)
        expect(respuesta.body).toHaveProperty('error')
        expect(respuesta.body.error).toBe('Producto no encontrado')  
    })
    it('get el producto exista ', async () => {
        const id = 5
        const respuesta = await request(server).get(`/api/products/1`)
        // en este caso esperamos como respuesta errores
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveProperty('data')
        expect(respuesta.headers['content-type']).toMatch(/json/)  
    })
})

describe('put /api/products/:id', ()=>{
    it('should check a valid id un the url/ checar que el id sea valido en la url', async () => {
        const respuesta = await request(server).put(`/api/products/not-valid-url`).send({
            name: "audifonos",
            price: 100,
            availability: true
        })
        expect(respuesta.status).toBe(400)
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.body.errors[0].msg).toBe('Id no valido')
    })

    it('get should return a 404 response for a non-existent product/ regresar un 404 si el producto no existe', async () => {
        const id = 5
        const respuesta = await request(server).put(`/api/products/${id}`).send({
            name: "audifonos",
            price: 100,
            availability: true
        })
        // en este caso esperamos como respuesta errores
        expect(respuesta.status).toBe(404)
        expect(respuesta.body).toHaveProperty('error')
        expect(respuesta.body.error).toBe('Producto no encontrado')  
    })

    it('should display validation error messages when updating a product/ mostrar mensajes de error de validacion cuando actualiza un producto', async () => {
        const id = 1
        const respuesta = await request(server).put(`/api/products/${id}`).send({})
        expect(respuesta.status).toBe(400)
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.body.errors).toHaveLength(5)
    })

    it('introducir un precio valido y mayor a cero', async () => {
        const respuesta = await request(server).put(`/api/products/1`).send({
            "name": "audifonos",
            "price": 0,
            "availability": true
        })
        expect(respuesta.status).toBe(400)
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.body.errors[0].msg).toBe('precio no valido')
    })
    
    it('debe actualizar un producto que ya existe', async () => {
        const respuesta = await request(server).put(`/api/products/1`).send({
            "name": "audifonos",
            "price": 100,
            "availability": true
        })
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveProperty('data')
        
        expect(respuesta.status).not.toBe(404)
        expect(respuesta.body).not.toHaveProperty('error')
    })
})

describe('patch /api/products/:id', ()=>{
    it('retornar errores si el id no es valido', async () => {
        const respuesta = await request(server).patch('/api/products/no-valido')
        expect(respuesta.status).toBe(400)
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.body.errors[0].msg).toBe('Id no valido')
    })

    it('retornar 404 si el producto no existe', async () => {
        const respuesta = await request(server).patch('/api/products/20')
        expect(respuesta.status).toBe(404)
        expect(respuesta.body).toHaveProperty('error')
        expect(respuesta.body.error).toBe('Producto no encontrado')
    })

    it('debe actualizar la disponivilidad de un producto', async () => {
        const respuesta = await request(server).patch('/api/products/1')
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveProperty('data')
    })
})

describe('DELETE /api/products/:id', ()=>{
    it('checar que el id sea valido', async () => {
        const respuesta = await request(server).delete('/api/products/id_no-valido')
        expect(respuesta.body).toHaveProperty('errors')
        expect(respuesta.status).toBe(400)
        expect(respuesta.body.errors[0].msg).toBe('Id no valido')
    })

    it('debe retornar un 404 para un producto que no existe', async () => {
        const respuesta = await request(server).delete('/api/products/5')
        expect(respuesta.status).toBe(404)
        expect(respuesta.body).toHaveProperty('error')
        expect(respuesta.body.error).toBe('Producto no encontrado')
    })

    it('debe eliminar un producto', async () => {
        const respuesta = await request(server).delete('/api/products/1')

        expect(respuesta.status).toBe(200)
        expect(respuesta.body.data).toBe('Producto Eliminado')
        expect(respuesta.body).toHaveProperty('data')
    })
})