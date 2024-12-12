const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Carrito de Compras',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de usuarios, productos y carritos de compra.',
      contact: {
        name: 'Jaime Torres',
        email: 'jacatorresre@ittepic.edu.mx',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia según tu entorno
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    './src/routes/userroutes.js',
    './src/routes/productroutes.js',
    './src/routes/shoppingcartroutes.js'
  ], // Especifica las rutas exactas de tus archivos de rutas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;