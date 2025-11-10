import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2', //te da los lineamientos para la restApi
        tags:[{
            name: 'Products', 
            description: 'operaciones relacionadas a products'
        }], //lo que vamos a documentar
        info:{ //informacion general de nuestra api
            title:'REST Api Node.js, TS, Express',
            version: '1.0.0',
            description: 'api docs for products'
        }
    },
    apis:['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

// editar imagenes y colores de swagger
// const swaggerUiOptions : SwaggerUiOptions = {
//     customCss:`
//         .topbar-wrapper . link {
//             content: url();
//             height: 120px;
//             width: auto;
//         }
//     `,
//     customSiteTitle: 'documentacion'
// }

export default swaggerSpec

// export{swaggerUiOptions} se exporta y se usa en el server