// request sirve para enviar una peticion a un determinado endpoint de nuestro proyecto
import request from 'supertest' 
import server from '../server'

describe('GET /api', ()=>{
    // la conexion al servidor va a ser asincrona por que no sabemos cuanto va a tardar la respuesta
    it('should send back a json response / regresar una respuesta json', async ()=>{
        // a request le pasamos donde debe conectarse (server) y haremos una peticion get a /api
        const respuesta = await request(server).get('/api')
        // ponemos que es lo que estamos esperando
        expect(respuesta.status).toBe(200)
        // esperar que la respuesta sea un json con content-type/ tipo de contenido
        expect(respuesta.headers['content-type']).toMatch(/json/)
        expect(respuesta.body.msg).toBe('desde api')

        expect(respuesta.status).not.toBe(404)
    })
})






// nos va a ayudar para agrupar una serie de pruevas que esten relacionadas 
// describe('primer test', () => {
//     it('revisar que la suma sea 2 de 1+1', () => {
//         // expect (que es lo que espero) esta habilitado de forma global y toBe (valor con el que lo vas a comparar)
//         expect(1+1).toBe(2)
//     })
// })