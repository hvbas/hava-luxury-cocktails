const express = require('express');
const router = express.Router();
const { ensureAuthenticated, loadUser } = require('../middleware/auth');
const cocktailController = require('../controllers/cocktailController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/cocktails');
  },
  filename: function(req, file, cb) {
    cb(null, `cocktail-${Date.now()}${path.extname(file.originalname)}`);
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
  limits: { fileSize: 2000000 }, // 2MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Get all cocktails
router.get('/', loadUser, cocktailController.renderAllCocktails);

// Add cocktail form
router.get('/add', ensureAuthenticated, cocktailController.renderAddCocktail);

// Process add form
router.post('/', ensureAuthenticated, upload.single('image'), cocktailController.addCocktail);

// Show single cocktail
router.get('/:id', loadUser, cocktailController.renderCocktail);

// Edit cocktail form
router.get('/edit/:id', ensureAuthenticated, cocktailController.renderEditCocktail);

// Update cocktail
router.put('/:id', ensureAuthenticated, upload.single('image'), cocktailController.updateCocktail);

// Delete cocktail (POST method with method-override)
router.delete('/:id', ensureAuthenticated, cocktailController.deleteCocktail);

// Direct delete route (GET method for easier access)
router.get('/delete/:id', ensureAuthenticated, cocktailController.deleteCocktail);

// Add rating to cocktail
router.post('/:id/rate', ensureAuthenticated, cocktailController.addRating);

// Add comment to cocktail
router.post('/:id/comments', ensureAuthenticated, cocktailController.addComment);

// Delete comment
router.delete('/:cocktailId/comments/:commentId', ensureAuthenticated, cocktailController.deleteComment);

module.exports = router;
