const User = require('../models/user');

/**
 * @desc Récupérer tous les utilisateurs
 * @route GET /users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('users/index', { users });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Récupérer un utilisateur par email
 * @route GET /users/:email
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.render('users/detail', { user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @desc Créer un utilisateur
 * @route POST /users
 */
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/users');
  } catch (error) {
    res.status(400).send('Erreur lors de la création');
  }
};

/**
 * @desc Modifier un utilisateur
 * @route PUT /users/:email
 */
const updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ email: req.params.email }, req.body);
    res.redirect('/users');
  } catch (error) {
    res.status(400).send('Erreur lors de la modification');
  }
};

/**
 * @desc Supprimer un utilisateur
 * @route DELETE /users/:email
 */
const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression');
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };