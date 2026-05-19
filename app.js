const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/user');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const app = express();

// Connexion à MongoDB
connectDB();

// Moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const catwayRoutes = require('./routes/catways');
app.use('/catways', catwayRoutes);

const reservationRoutes = require('./routes/reservations');
app.use('/catways/:id/reservations', reservationRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

const { isAuthenticated } = require('./middleware/auth');
const Reservation = require('./models/reservation');

app.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const today = new Date();
    const reservations = await Reservation.find({
      endDate: { $gte: today }
    });
    res.render('dashboard', {
      user: req.session.user,
      reservations,
      today
    });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/reservations', isAuthenticated, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations/index', { reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/reservations/new', isAuthenticated, (req, res) => {
  res.render('reservations/new');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.get('/setup', async (req, res) => {
  const User = require('./models/user');
  try {
    const user = await User.create({
      username: 'admin',
      email: 'admin@port-russell.fr',
      password: 'admin123'
    });
    res.send('Utilisateur admin créé : ' + user.email);
  } catch (error) {
    res.send('Erreur : ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;