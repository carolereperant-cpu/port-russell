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
 * @route GET /catways
 * @route POST /catways
 * @route GET /catways/:id
 * @route PUT /catways/:id
 * @route DELETE /catways/:id
 */
router.get('/', isAuthenticated, getAllCatways);
router.post('/', isAuthenticated, createCatway);
router.get('/new', isAuthenticated, (req, res) => {
  res.render('catways/new');
});
router.get('/:id', isAuthenticated, getCatway);
router.put('/:id', isAuthenticated, updateCatway);
router.delete('/:id', isAuthenticated, deleteCatway);

module.exports = router;