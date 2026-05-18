const Catway = require('../models/catway');

/**
 * @desc Récupérer tous les catways
 * @route GET /catways
 */
const getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catways/index', { catways });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Récupérer un catway par son numéro
 * @route GET /catways/:id
 */
const getCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).send('Catway non trouvé');
    res.render('catways/detail', { catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Créer un catway
 * @route POST /catways
 */
const createCatway = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.redirect('/catways');
  } catch (error) {
    res.status(400).send('Erreur lors de la création');
  }
};

/**
 * @desc Modifier l'état d'un catway
 * @route PUT /catways/:id
 */
const updateCatway = async (req, res) => {
  try {
    await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState: req.body.catwayState }
    );
    res.redirect('/catways');
  } catch (error) {
    res.status(400).send('Erreur lors de la modification');
  }
};

/**
 * @desc Supprimer un catway
 * @route DELETE /catways/:id
 */
const deleteCatway = async (req, res) => {
  try {
    await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    res.redirect('/catways');
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression');
  }
};

module.exports = { getAllCatways, getCatway, createCatway, updateCatway, deleteCatway };