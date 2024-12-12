require('dotenv').config();
const express = require('express');
const { mongoose } = require('./config/database.config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.config');

const userRoutes = require('./routes/userroutes');
const productRoutes = require('./routes/productroutes');
const shoppingcartRoutes = require('./routes/shoppingcartroutes');

const app = express();

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/carritos', shoppingcartRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
