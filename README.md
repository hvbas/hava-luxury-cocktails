# Luxury Cocktails - Premium Cocktail Recipe Collection

<p align="center">
  <h2 align="center">🍸 Luxury Cocktails 🍹</h2>
</p>

## Project Description
Luxury Cocktails is an elegant web application designed for cocktail enthusiasts to discover, share, and curate premium cocktail recipes. With its sophisticated dark and gold theme, the application provides a luxurious experience for users to explore the world of high-end mixology. Built with Node.js using MVC architecture and Server-Side Rendering (SSR), it offers a seamless and responsive user experience.

## Features

### User Experience
- **Elegant User Interface**: Luxurious dark theme with gold accents throughout the application
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Intuitive Navigation**: Seamless browsing experience with clear categorization

### User Management
- **Secure Authentication**: User registration and login with encrypted passwords
- **Personalized Profiles**: Customizable user profiles with avatar options
- **Dashboard**: Personal dashboard showing user statistics and activities

### Recipe Management
- **Create & Share**: Add your own cocktail recipes with detailed instructions and ingredients
- **Edit & Update**: Modify your recipes anytime with easy-to-use forms
- **Delete**: Remove recipes you no longer want to share
- **Rich Media Support**: Upload high-quality images for your cocktail creations

### Social Features
- **Ratings & Reviews**: Rate and comment on recipes from other mixologists
- **Favorites Collection**: Save your favorite recipes for quick access
- **Community Engagement**: Interact with other cocktail enthusiasts

## Technologies

### Backend
- **Core**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express Session, bcryptjs for password encryption
- **File Handling**: Multer for image uploads

### Frontend
- **Templating**: Handlebars (Express Handlebars)
- **Styling**: Custom CSS with Bootstrap 5 framework
- **Interactivity**: Vanilla JavaScript with modern ES6+ features
- **Icons**: Font Awesome for elegant iconography

### Development Tools
- **Environment**: Dotenv for configuration management
- **Debugging**: Connect Flash for user notifications
- **HTTP Methods**: Method Override for RESTful routes

## Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB (local or Atlas cloud instance)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxury-cocktails.git
   cd luxury-cocktails
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/luxury_cocktails
   SESSION_SECRET=your_secure_session_secret
   PORT=3000
   ```

4. **Start the application**
   
   For development:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Application Architecture

### MVC Structure
The application follows the Model-View-Controller (MVC) architecture pattern for clean separation of concerns:

### Models
- **User.js**: Manages user profiles, authentication, and favorites collection
- **Cocktail.js**: Handles cocktail recipes, ratings, comments, and media attachments
- **Category.js**: Organizes cocktails into browsable categories

### Controllers
- **userController.js**: Manages user authentication, profile management, and favorites
- **cocktailController.js**: Handles CRUD operations for cocktail recipes, ratings, and comments
- **indexController.js**: Controls general page rendering including home, about, and contact pages

### Views
- **layouts/main.handlebars**: The elegant main template with the luxury dark and gold theme
- **partials/**: Reusable UI components including:
  - **_navbar.handlebars**: Sophisticated navigation bar with user dropdown
  - **_footer.handlebars**: Elegant footer with social links and copyright
  - **_messages.handlebars**: Stylish flash notifications
- **index.handlebars**: Stunning home page showcasing featured cocktails
- **dashboard.handlebars**: Personalized user dashboard with statistics
- **users/**: User-related views with luxury styling:
  - **login.handlebars**: Elegant login form
  - **register.handlebars**: Stylish registration form
  - **profile.handlebars**: User profile with avatar customization
  - **favorites.handlebars**: Collection of user's favorite cocktails
- **cocktails/**: Cocktail-related views:
  - **index.handlebars**: Gallery of cocktail recipes
  - **show.handlebars**: Detailed view of a cocktail with ratings
  - **add.handlebars**: Form to create new cocktail recipes
  - **edit.handlebars**: Form to modify existing recipes
- **about.handlebars**: Elegant about page with mission and statistics
- **contact.handlebars**: Stylish contact form with information

### Routes
- **index.js**: Main routes for home, about, contact, and dashboard
- **users.js**: Authentication, profile, and favorites management routes
- **cocktails.js**: CRUD operations for cocktail recipes and interactions

## Getting Started

After installation, follow these steps to begin your luxury cocktail experience:

1. **Create an Account**: Register with your email and password
2. **Customize Your Profile**: Add your details and select a luxury avatar
3. **Explore Recipes**: Browse through existing cocktail recipes
4. **Add Your Creations**: Share your own premium cocktail recipes
5. **Build Your Collection**: Save your favorites for quick access

## Contributing

We welcome contributions to enhance the Luxury Cocktails experience. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">Crafted with passion by <strong>Hava Basaslan</strong> for cocktail enthusiasts</p>
