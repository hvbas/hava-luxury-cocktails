const Cocktail = require('../models/Cocktail');
const User = require('../models/User');

// Cocktail Controller
const cocktailController = {
  // Render home page with featured cocktails
  renderHome: async (req, res) => {
    try {
      // Create a filter for public cocktails
      const publicFilter = { isPublic: true };
      
      // If user is logged in, also include their own cocktails
      if (req.user) {
        publicFilter.$or = [
          { isPublic: true },
          { user: req.user._id }
        ];
      }
      
      console.log('Home page filter:', JSON.stringify(publicFilter));
      
      // Get top rated cocktails
      const topRated = await Cocktail.find(publicFilter)
        .sort({ 'ratings.average': -1 })
        .limit(4)
        .populate('user', 'name avatar');
      
      // Get newest cocktails
      const newest = await Cocktail.find(publicFilter)
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('user', 'name avatar');
      
      console.log(`Found ${topRated.length} top rated and ${newest.length} newest cocktails`);
      
      res.render('index', {
        title: 'Home',
        topRated,
        newest
      });
    } catch (err) {
      console.error('Error loading home page:', err);
      res.render('index', {
        title: 'Home',
        topRated: [],
        newest: []
      });
    }
  },

  // Render dashboard with user's cocktails
  renderDashboard: async (req, res) => {
    try {
      const cocktails = await Cocktail.find({ user: req.user._id })
        .sort({ createdAt: -1 });
      
      res.render('dashboard', {
        title: 'Dashboard',
        cocktails
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while loading your recipes');
      res.render('dashboard', {
        title: 'Dashboard',
        cocktails: []
      });
    }
  },

  // Render all cocktails page with filtering
  renderAllCocktails: async (req, res) => {
    try {
      const { category, search } = req.query;
      let query = {};
      
      // Apply category filter if provided
      if (category && category !== 'all') {
        query.category = category;
      }
      
      // Apply search filter if provided
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      
      const cocktails = await Cocktail.find(query)
        .sort({ createdAt: -1 })
        .populate('user', 'name avatar');
      
      res.render('cocktails/index', {
        title: 'All Recipes',
        cocktails,
        category: category || 'all',
        search: search || '',
        categories: ['Non-Alcoholic', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Wine', 'Liqueur', 'Other']
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while loading recipes');
      res.redirect('/');
    }
  },

  // Render add cocktail form
  renderAddCocktail: (req, res) => {
    res.render('cocktails/add', {
      title: 'Add New Recipe',
      categories: ['Non-Alcoholic', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Wine', 'Liqueur', 'Other'],
      difficulties: ['Easy', 'Medium', 'Hard']
    });
  },

  // Handle add cocktail form submission
  addCocktail: async (req, res) => {
    try {
      const { 
        name, description, instructions, category, 
        difficulty, prepTime, ingredientNames, ingredientAmounts, isPublic 
      } = req.body;
      
      // Validate required fields
      if (!name || !description || !instructions || !category || !difficulty || !prepTime) {
        req.flash('error_msg', 'Lütfen tüm gerekli alanları doldurun');
        return res.redirect('/cocktails/add');
      }
      
      // Create ingredients array
      const ingredients = [];
      if (Array.isArray(ingredientNames)) {
        for (let i = 0; i < ingredientNames.length; i++) {
          if (ingredientNames[i] && ingredientAmounts[i]) {
            ingredients.push({
              name: ingredientNames[i],
              amount: ingredientAmounts[i]
            });
          }
        }
      } else if (ingredientNames && ingredientAmounts) {
        ingredients.push({
          name: ingredientNames,
          amount: ingredientAmounts
        });
      }
      
      // Create new cocktail
      const newCocktail = new Cocktail({
        name,
        description,
        ingredients,
        instructions,
        category,
        difficulty,
        prepTime,
        user: req.user._id,
        isPublic: isPublic === 'true' || isPublic === true
      });
      
      // Handle image upload
      if (req.file) {
        newCocktail.image = req.file.filename;
      }
      
      await newCocktail.save();
      req.flash('success_msg', 'Yeni tarif başarıyla eklendi');
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Tarif eklenirken bir hata oluştu');
      res.redirect('/cocktails/add');
    }
  },

  // Render single cocktail page
  renderCocktail: async (req, res) => {
    try {
      const cocktail = await Cocktail.findById(req.params.id)
        .populate('user', 'name avatar')
        .populate('comments.user', 'name avatar');
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/cocktails');
      }
      
      // Check if in user's favorites
      let isFavorite = false;
      if (req.user) {
        const user = await User.findById(req.user._id);
        isFavorite = user.favorites.some(fav => fav.toString() === cocktail._id.toString());
      }
      
      // Check if user has rated
      let userRating = 0;
      if (req.user) {
        const ratingObj = cocktail.ratings.find(r => r.user.toString() === req.user._id.toString());
        if (ratingObj) {
          userRating = ratingObj.value;
        }
      }
      
      res.render('cocktails/show', {
        title: cocktail.name,
        cocktail,
        isFavorite,
        userRating
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Tarif yüklenirken bir hata oluştu');
      res.redirect('/cocktails');
    }
  },

  // Render edit cocktail form
  renderEditCocktail: async (req, res) => {
    try {
      const cocktail = await Cocktail.findById(req.params.id);
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/dashboard');
      }
      
      // Check if user owns the cocktail
      if (cocktail.user.toString() !== req.user._id.toString()) {
        req.flash('error_msg', 'Bu işlem için yetkiniz yok');
        return res.redirect('/cocktails');
      }
      
      res.render('cocktails/edit', {
        title: 'Edit Recipe',
        cocktail,
        categories: ['Non-Alcoholic', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Wine', 'Liqueur', 'Other'],
        difficulties: ['Easy', 'Medium', 'Hard']
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while loading the recipe');
      res.redirect('/dashboard');
    }
  },

  // Handle edit cocktail form submission
  updateCocktail: async (req, res) => {
    try {
      const { 
        name, description, instructions, category, 
        difficulty, prepTime, ingredientNames, ingredientAmounts 
      } = req.body;
      
      const cocktail = await Cocktail.findById(req.params.id);
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/dashboard');
      }
      
      // Check if user owns the cocktail
      if (cocktail.user.toString() !== req.user._id.toString()) {
        req.flash('error_msg', 'Bu işlem için yetkiniz yok');
        return res.redirect('/cocktails');
      }
      
      // Update cocktail fields
      cocktail.name = name;
      cocktail.description = description;
      cocktail.instructions = instructions;
      cocktail.category = category;
      cocktail.difficulty = difficulty;
      cocktail.prepTime = prepTime;
      
      // Update ingredients
      const ingredients = [];
      if (Array.isArray(ingredientNames)) {
        for (let i = 0; i < ingredientNames.length; i++) {
          if (ingredientNames[i] && ingredientAmounts[i]) {
            ingredients.push({
              name: ingredientNames[i],
              amount: ingredientAmounts[i]
            });
          }
        }
      } else if (ingredientNames && ingredientAmounts) {
        ingredients.push({
          name: ingredientNames,
          amount: ingredientAmounts
        });
      }
      cocktail.ingredients = ingredients;
      
      // Handle image upload
      if (req.file) {
        cocktail.image = req.file.filename;
      }
      
      await cocktail.save();
      req.flash('success_msg', 'Tarif başarıyla güncellendi');
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Tarif güncellenirken bir hata oluştu');
      res.redirect(`/cocktails/edit/${req.params.id}`);
    }
  },

  // Delete cocktail - completely rewritten for reliability
  deleteCocktail: async (req, res) => {
    console.log('===== DELETE OPERATION START =====');
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    
    // Get the cocktail ID from the request parameters
    const cocktailId = req.params.id;
    console.log('Cocktail ID to delete:', cocktailId);
    
    // Check if cocktailId is valid
    if (!cocktailId || cocktailId === 'undefined') {
      console.log('ERROR: Invalid cocktail ID');
      req.flash('error_msg', 'Invalid recipe ID');
      return res.redirect('/dashboard');
    }
    
    // Check if user is authenticated
    if (!req.user) {
      console.log('ERROR: User not authenticated');
      req.flash('error_msg', 'You must be logged in to delete a recipe');
      return res.redirect('/users/login');
    }
    
    console.log('User ID:', req.user._id);
    
    try {
      // Find the cocktail by ID first to check ownership
      const cocktail = await Cocktail.findById(cocktailId);
      
      // If cocktail doesn't exist, redirect to dashboard
      if (!cocktail) {
        console.log('ERROR: Cocktail not found with ID:', cocktailId);
        req.flash('error_msg', 'Recipe not found');
        return res.redirect('/dashboard');
      }
      
      console.log('Cocktail found:', cocktail.title);
      console.log('Cocktail owner ID:', cocktail.user.toString());
      console.log('Current user ID:', req.user._id.toString());
      
      // Check if user owns the cocktail
      if (cocktail.user.toString() !== req.user._id.toString()) {
        console.log('ERROR: User does not have permission to delete this cocktail');
        req.flash('error_msg', 'You do not have permission to delete this recipe');
        return res.redirect('/dashboard');
      }
      
      // Delete the cocktail using deleteOne for reliability
      console.log('Proceeding with deletion...');
      const deleteResult = await Cocktail.deleteOne({ _id: cocktailId });
      
      console.log('Delete operation result:', JSON.stringify(deleteResult));
      
      if (deleteResult.deletedCount === 0) {
        console.log('ERROR: Deletion failed - no documents deleted');
        req.flash('error_msg', 'Failed to delete recipe. Please try again.');
        return res.redirect('/dashboard');
      }
      
      console.log('SUCCESS: Cocktail deleted successfully');
      
      // Also remove from all users' favorites
      console.log('Removing from all users\'s favorites collections...');
      await User.updateMany(
        { favorites: cocktailId },
        { $pull: { favorites: cocktailId } }
      );
      
      // Set success message
      req.flash('success_msg', 'Recipe successfully deleted');
      
      // Always redirect to dashboard after deletion
      console.log('Redirecting to dashboard');
      console.log('===== DELETE OPERATION END =====');
      return res.redirect('/dashboard');
      
    } catch (err) {
      console.error('ERROR: Exception while deleting cocktail:', err);
      req.flash('error_msg', 'An error occurred while deleting the recipe');
      return res.redirect('/dashboard');
    }
  },

  // Add rating to cocktail
  addRating: async (req, res) => {
    try {
      const { rating } = req.body;
      const cocktail = await Cocktail.findById(req.params.id);
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/cocktails');
      }
      
      // Check if user has already rated
      const ratingIndex = cocktail.ratings.findIndex(r => 
        r.user.toString() === req.user._id.toString()
      );
      
      if (ratingIndex !== -1) {
        // Update existing rating
        cocktail.ratings[ratingIndex].value = rating;
      } else {
        // Add new rating
        cocktail.ratings.push({
          user: req.user._id,
          value: rating
        });
      }
      
      await cocktail.save();
      req.flash('success_msg', 'Puanınız kaydedildi');
      res.redirect(`/cocktails/${req.params.id}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Puanlama yapılırken bir hata oluştu');
      res.redirect(`/cocktails/${req.params.id}`);
    }
  },

  // Add comment to cocktail
  addComment: async (req, res) => {
    try {
      const { comment } = req.body;
      const cocktail = await Cocktail.findById(req.params.id);
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/cocktails');
      }
      
      cocktail.comments.push({
        user: req.user._id,
        text: comment,
        name: req.user.name,
        avatar: req.user.avatar
      });
      
      await cocktail.save();
      req.flash('success_msg', 'Yorumunuz eklendi');
      res.redirect(`/cocktails/${req.params.id}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Yorum eklenirken bir hata oluştu');
      res.redirect(`/cocktails/${req.params.id}`);
    }
  },

  // Delete comment
  deleteComment: async (req, res) => {
    try {
      const { cocktailId, commentId } = req.params;
      const cocktail = await Cocktail.findById(cocktailId);
      
      if (!cocktail) {
        req.flash('error_msg', 'Tarif bulunamadı');
        return res.redirect('/cocktails');
      }
      
      // Find comment
      const comment = cocktail.comments.id(commentId);
      
      if (!comment) {
        req.flash('error_msg', 'Yorum bulunamadı');
        return res.redirect(`/cocktails/${cocktailId}`);
      }
      
      // Check if user owns the comment or the cocktail
      if (comment.user.toString() !== req.user._id.toString() && 
          cocktail.user.toString() !== req.user._id.toString()) {
        req.flash('error_msg', 'Bu işlem için yetkiniz yok');
        return res.redirect(`/cocktails/${cocktailId}`);
      }
      
      comment.remove();
      await cocktail.save();
      
      req.flash('success_msg', 'Yorum silindi');
      res.redirect(`/cocktails/${cocktailId}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Yorum silinirken bir hata oluştu');
      res.redirect(`/cocktails/${req.params.cocktailId}`);
    }
  }
};

module.exports = cocktailController;
