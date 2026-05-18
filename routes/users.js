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

router.get('/', isAuthenticated, getAllUsers);
router.post('/', isAuthenticated, createUser);
router.get('/:email', isAuthenticated, getUser);
router.put('/:email', isAuthenticated, updateUser);
router.delete('/:email', isAuthenticated, deleteUser);

module.exports = router;