const User = require('../models/User');

module.exports = {
  // Ensure user is authenticated
  ensureAuthenticated: function(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view this page');
    res.redirect('/users/login');
  },
  
  // Ensure user is NOT authenticated (for login/register pages)
  ensureGuest: function(req, res, next) {
    if (!req.session.userId) {
      return next();
    }
    res.redirect('/dashboard');
  },
  
  // Load user data if authenticated
  loadUser: async function(req, res, next) {
    if (req.session.userId) {
      try {
        const user = await User.findById(req.session.userId);
        if (user) {
          req.user = user;
          res.locals.user = user;
        } else {
          delete req.session.userId;
        }
      } catch (err) {
        console.error(err);
      }
    }
    next();
  }
};
