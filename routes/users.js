const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Utilisateur créé
 */
router.get('/', isAuthenticated, getAllUsers);
router.post('/', isAuthenticated, createUser);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupérer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail de l'utilisateur
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.get('/:email', isAuthenticated, getUser);
router.put('/:email', isAuthenticated, updateUser);
router.delete('/:email', isAuthenticated, deleteUser);

module.exports = router;