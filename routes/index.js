const express = require('express');
const router = express.Router();
const { ensureAuthenticated, loadUser } = require('../middleware/auth');
const cocktailController = require('../controllers/cocktailController');
const indexController = require('../controllers/indexController');

// Home page
router.get('/', loadUser, cocktailController.renderHome);

// Dashboard - Protected route
router.get('/dashboard', ensureAuthenticated, cocktailController.renderDashboard);

// About page
router.get('/about', loadUser, indexController.renderAbout);

// Contact page
router.get('/contact', loadUser, indexController.renderContact);
router.post('/contact', loadUser, indexController.submitContact);

module.exports = router;
