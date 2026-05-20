const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllCatways,
  getCatway,
  createCatway,
  updateCatway,
  deleteCatway
} = require('../controllers/catwayController');

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               catwayType:
 *                 type: string
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway créé
 */
router.get('/', isAuthenticated, getAllCatways);
router.post('/', isAuthenticated, createCatway);
router.get('/new', isAuthenticated, (req, res) => {
  res.render('catways/new');
});

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupérer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Détail du catway
 *   put:
 *     summary: Modifier l'état d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Catway modifié
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Catway supprimé
 */
router.get('/:id', isAuthenticated, getCatway);
router.put('/:id', isAuthenticated, updateCatway);
router.delete('/:id', isAuthenticated, deleteCatway);

module.exports = router;