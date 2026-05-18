/**
 * Middleware de protection des routes
 * Redirige vers la page d'accueil si l'utilisateur n'est pas connecté
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction suivante
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/');
};

module.exports = { isAuthenticated };