const User = require('../models/User');

// User Controller
const userController = {
  // Render register page
  renderRegister: (req, res) => {
    res.render('users/register', {
      title: 'Register'
    });
  },

  // Handle user registration
  registerUser: async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('users/register', {
        title: 'Kayıt Ol',
        errors,
        name,
        email
      });
    } else {
      try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
          errors.push({ msg: 'This email is already registered' });
          res.render('users/register', {
            title: 'Kayıt Ol',
            errors,
            name,
            email
          });
        } else {
          // Create new user
          const newUser = new User({
            name,
            email,
            password
          });

          // Save user
          await newUser.save();
          req.flash('success_msg', 'You are now registered and can log in');
          res.redirect('/users/login');
        }
      } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred, please try again');
        res.redirect('/users/register');
      }
    }
  },

  // Render login page
  renderLogin: (req, res) => {
    res.render('users/login', {
      title: 'Login'
    });
  },

  // Handle user login
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        req.flash('error_msg', 'This email is not registered');
        return res.redirect('/users/login');
      }

      // Match password
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        req.flash('error_msg', 'Password incorrect');
        return res.redirect('/users/login');
      }

      // Set session
      req.session.userId = user._id;
      req.flash('success_msg', 'You have successfully logged in');
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while logging in');
      res.redirect('/users/login');
    }
  },

  // Handle user logout
  logoutUser: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },

  // Render user profile
  renderProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.render('users/profile', {
        title: 'Profile',
        user
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while loading profile');
      res.redirect('/dashboard');
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    const { name, email } = req.body;
    
    try {
      const user = await User.findById(req.user._id);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/users/profile');
      }
      
      user.name = name;
      user.email = email;
      
      // Handle avatar upload if implemented
      if (req.file) {
        user.avatar = req.file.filename;
      }
      
      await user.save();
      req.flash('success_msg', 'Profile successfully updated');
      res.redirect('/users/profile');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while updating profile');
      res.redirect('/users/profile');
    }
  },

  // Add cocktail to favorites
  addToFavorites: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const cocktailId = req.params.id;
      
      // Check if already in favorites
      if (user.favorites.includes(cocktailId)) {
        req.flash('error_msg', 'This recipe is already in your favorites');
        return res.redirect(`/cocktails/${cocktailId}`);
      }
      
      user.favorites.push(cocktailId);
      await user.save();
      
      req.flash('success_msg', 'Recipe added to your favorites');
      res.redirect(`/cocktails/${cocktailId}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while adding to favorites');
      res.redirect(`/cocktails/${req.params.id}`);
    }
  },

  // Remove cocktail from favorites
  removeFromFavorites: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const cocktailId = req.params.id;
      
      user.favorites = user.favorites.filter(fav => fav.toString() !== cocktailId);
      await user.save();
      
      req.flash('success_msg', 'Recipe removed from your favorites');
      res.redirect(`/cocktails/${cocktailId}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while removing from favorites');
      res.redirect(`/cocktails/${req.params.id}`);
    }
  },

  // Render user favorites
  renderFavorites: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('favorites');
      
      res.render('users/favorites', {
        title: 'My Favorites',
        cocktails: user.favorites
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while loading favorites');
      res.redirect('/dashboard');
    }
  }
};

module.exports = userController;
