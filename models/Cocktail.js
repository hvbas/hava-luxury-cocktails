const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    }
  }],
  instructions: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Non-Alcoholic', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Wine', 'Liqueur', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  prepTime: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'default-cocktail.jpg'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: true
  }
});

// Virtual for average rating
CocktailSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) {
    return 0;
  }
  
  const sum = this.ratings.reduce((total, rating) => total + rating.value, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Set virtuals to true when converting to JSON
CocktailSchema.set('toJSON', { virtuals: true });
CocktailSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Cocktail', CocktailSchema);
