const express = require('express');
const router = express.Router({ mergeParams: true });
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');

router.get('/', isAuthenticated, getAllReservations);
router.post('/', isAuthenticated, createReservation);
router.get('/:idReservation', isAuthenticated, getReservation);
router.put('/:idReservation', isAuthenticated, updateReservation);
router.delete('/:idReservation', isAuthenticated, deleteReservation);

module.exports = router;