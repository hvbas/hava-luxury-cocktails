const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest, loadUser } = require('../middleware/auth');
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/avatars');
  },
  filename: function(req, file, cb) {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Register Page
router.get('/register', ensureGuest, userController.renderRegister);

// Register Handle
router.post('/register', ensureGuest, userController.registerUser);

// Login Page
router.get('/login', ensureGuest, userController.renderLogin);

// Login Handle
router.post('/login', ensureGuest, userController.loginUser);

// Logout
router.get('/logout', userController.logoutUser);

// Profile Page
router.get('/profile', ensureAuthenticated, userController.renderProfile);

// Update Profile
router.put('/profile', ensureAuthenticated, upload.single('avatar'), userController.updateProfile);

// Favorites
router.get('/favorites', ensureAuthenticated, userController.renderFavorites);

// Add to favorites
router.post('/favorites/:id', ensureAuthenticated, userController.addToFavorites);

// Remove from favorites
router.delete('/favorites/:id', ensureAuthenticated, userController.removeFromFavorites);

module.exports = router;
