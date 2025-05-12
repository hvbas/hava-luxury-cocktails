const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cocktail_recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) { return a === b; },
    formatDate: function (date, format) {
      const d = new Date(date);
      if (format && typeof format === 'string') {
        // Basic format implementation
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        
        // Handle ordinal suffix for day
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        if (day === 2 || day === 22) suffix = 'nd';
        if (day === 3 || day === 23) suffix = 'rd';
        
        // Replace format tokens
        return format
          .replace('MMMM', month)
          .replace('Do', day + suffix)
          .replace('YYYY', year);
      }
      
      // Default format
      return d.toLocaleDateString('en-US');
    },
    truncate: function (str, len) {
      if (!str) return '';
      if (str.length > len) {
        return str.substring(0, len) + '...';
      }
      return str;
    },
    calculateAverageRating: function (ratings) {
      if (!ratings || ratings.length === 0) {
        return 0;
      }
      const sum = ratings.reduce((total, rating) => total + rating.value, 0);
      return (sum / ratings.length).toFixed(1);
    },
    calculateTotalFavorites: function (favorites) {
      if (!favorites) return 0;
      return favorites.length;
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Cookie Parser
app.use(cookieParser());

// Express Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

// Connect Flash Middleware
app.use(flash());

// Import auth middleware
const { loadUser } = require('./middleware/auth');

// Load user middleware
app.use(loadUser);

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/cocktails', require('./routes/cocktails'));

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
