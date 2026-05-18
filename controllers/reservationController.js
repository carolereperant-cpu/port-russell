const Reservation = require('../models/reservation');

/**
 * @desc Récupérer toutes les réservations d'un catway
 * @route GET /catways/:id/reservations
 */
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.render('reservations/index', { reservations, catwayNumber: req.params.id });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Récupérer une réservation
 * @route GET /catways/:id/reservations/:idReservation
 */
const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('reservations/detail', { reservation });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Créer une réservation
 * @route POST /catways/:id/reservations
 */
const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    });
    await reservation.save();
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(400).send('Erreur lors de la création');
  }
};

/**
 * @desc Modifier une réservation
 * @route PUT /catways/:id/reservations/:idReservation
 */
const updateReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndUpdate(req.params.idReservation, req.body);
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(400).send('Erreur lors de la modification');
  }
};

/**
 * @desc Supprimer une réservation
 * @route DELETE /catways/:id/reservations/:idReservation
 */
const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.idReservation);
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression');
  }
};

module.exports = { getAllReservations, getReservation, createReservation, updateReservation, deleteReservation };