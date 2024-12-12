// product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del producto
 *         facturapiId:
 *           type: string
 *           description: ID del producto en Facturapi
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *           enum: ['Bebidas', 'Lácteos', 'Carnes', 'Frutas', 'Verduras', 'Panadería', 'Dulces', 'Limpieza', 'Higiene', 'Enlatados']
 *         brand:
 *           type: string
 *           description: Marca del producto
 *         stock:
 *           type: number
 *           description: Cantidad en stock
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las imágenes del producto
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - brand
 *         - images
 *       example:
 *         id: "61f7c802ab3c2b6a88e6c0c2"
 *         facturapiId: "facturapi_12345"
 *         name: "Leche 1L"
 *         description: "Leche Entera marca LALA presentacion 1L"
 *         price: 27
 *         category: "Lácteos"
 *         brand: "LALA"
 *         stock: 10
 *         createdAt: "2023-10-01T10:00:00Z"
 *         images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
 */

/**
 * @swagger
 * /api/productos/consultarTodos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/consultarTodos', productController.getAllProducts);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/productos/crear:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/crear', productController.createProduct);

/**
 * @swagger
 * /api/productos/actualizar/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
router.put('/actualizar/:id', productController.updateProduct);

/**
 * @swagger
 * /api/productos/eliminar/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/eliminar/:id', productController.deleteProduct);

module.exports = router;