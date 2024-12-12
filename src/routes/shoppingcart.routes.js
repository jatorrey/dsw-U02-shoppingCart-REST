const express = require('express');
const router = express.Router();
const {
    createCart,
    getCartById,
    getCartsByUserId,
    addProductToCart,
    removeProductFromCart,
    closeCart
} = require('../controllers/shoppingcart.controller');

// Crear un carrito nuevo y asociarlo a un usuario
router.post('/crear', createCart);

// Obtener un carrito específico por su _id
router.get('/:id', getCartById);

// Obtener todos los carritos de un usuario por el _id del usuario
router.get('/user/:userId', getCartsByUserId);

// Agregar un producto a un carrito
router.post('/:cartId/product', addProductToCart);

// Eliminar un producto del carrito
router.delete('/:cartId/product', removeProductFromCart);

// Cerrar un carrito
router.post('/:cartId/close', closeCart);

module.exports = router;
