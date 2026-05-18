const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * @route POST /login
 * @desc Connexion d'un utilisateur
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    // Créer la session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    res.redirect('/dashboard');
  } catch (error) {
    res.render('index', { error: 'Une erreur est survenue' });
  }
});

/**
 * @route GET /logout
 * @desc Déconnexion de l'utilisateur
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;