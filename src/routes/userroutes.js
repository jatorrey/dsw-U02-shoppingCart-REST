// user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario
 *         facturapiId:
 *           type: string
 *           description: ID del usuario en Facturapi
 *         rfc:
 *           type: string
 *           description: RFC único del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Password del usuario
 *         direccion:
 *           type: string
 *           description: Dirección registrada del usuario
 *         zip:
 *           type: string
 *           description: Código postal asociado a la dirección del usuario
 *         tel:
 *           type: string
 *           description: Número telefónico registrado al usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         role:
 *           type: string
 *           description: Rol del usuario, sea de usuario o de administrador
 *         payMethod:
 *           type: string
 *           description: Método de pago seleccionado por el usuario
 *       required:
 *         - facturapiId
 *         - rfc
 *         - name
 *         - email
 *         - password
 *         - direccion
 *         - zip
 *         - tel
 *         - role
 *         - payMethod
 *       example:
 *         id: "12345"
 *         facturapiId: "facturapi_67890"
 *         rfc: "XAXX010101000"
 *         name: "Juan Pérez"
 *         email: "juan.perez@example.com"
 *         password: "securepassword123"
 *         direccion: "Calle Falsa 123, Ciudad, País"
 *         zip: "12345"
 *         tel: "+521234567890"
 *         createdAt: "2023-10-01T10:00:00Z"
 *         role: "usuario"
 *         payMethod: "tarjeta de crédito"
 */

/**
 * @swagger
 * /api/usuarios/consultarTodos:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/consultarTodos', userController.getAllUsers);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/usuarios/crear:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/crear', userController.createUser);

/**
 * @swagger
 * /api/usuarios/actualizar/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/actualizar/:id', userController.updateUser);

/**
 * @swagger
 * /api/usuarios/eliminar/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/eliminar/:id', userController.deleteUser);

module.exports = router;