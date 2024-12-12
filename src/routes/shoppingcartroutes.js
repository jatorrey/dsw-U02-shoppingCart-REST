// shoppingcartroutes.js
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

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del carrito
 *         usuario:
 *           type: string
 *           description: ID del usuario al que pertenece el carrito
 *         productos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *                 description: ID del producto
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto
 *         estatus:
 *           type: string
 *           description: Estado del carrito (e.g., Activo, Inactivo)
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del carrito
 *         fechaCierre:
 *           type: string
 *           format: date-time
 *           description: Fecha de cierre del carrito
 *       required:
 *         - usuario
 *         - productos
 *       example:
 *         id: "61f7c802ab3c2b6a88e6c0c2"
 *         usuario: "61f7c802ab3c2b6a88e6c0c3"
 *         productos:
 *           - producto: "61f7c802ab3c2b6a88e6c0c4"
 *             cantidad: 2
 *         estatus: "Activo"
 *         fechaCreacion: "2023-10-01T10:00:00Z"
 *         fechaCierre: null
 */

/**
 * @swagger
 * /api/carritos/crear:
 *   post:
 *     summary: Crear un carrito nuevo y asociarlo a un usuario
 *     tags: [ShoppingCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario al que se asociará el carrito
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/crear', createCart);

/**
 * @swagger
 * /api/carritos/{id}:
 *   get:
 *     summary: Obtener un carrito específico por su _id
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Detalles del carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Carrito no encontrado
 */
router.get('/:id', getCartById);

/**
 * @swagger
 * /api/carritos/user/{userId}:
 *   get:
 *     summary: Obtener todos los carritos de un usuario por el _id del usuario
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de carritos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Usuario no encontrado o sin carritos
 */
router.get('/user/:userId', getCartsByUserId);

/**
 * @swagger
 * /api/carritos/{cartId}/product:
 *   post:
 *     summary: Agregar un producto a un carrito
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a agregar
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/:cartId/product', addProductToCart);

/**
 * @swagger
 * /api/carritos/{cartId}/product:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/:cartId/product', removeProductFromCart);

/**
 * @swagger
 * /api/carritos/{cartId}/close:
 *   post:
 *     summary: Cerrar un carrito
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito cerrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/:cartId/close', closeCart);

module.exports = router;