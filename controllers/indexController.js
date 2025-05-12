// Index Controller for general pages
const indexController = {
  // Render about page
  renderAbout: (req, res) => {
    res.render('about', {
      title: 'Hakkımızda'
    });
  },

  // Render contact page
  renderContact: (req, res) => {
    res.render('contact', {
      title: 'İletişim'
    });
  },

  // Handle contact form submission
  submitContact: (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically send an email or save to database
    // For now, we'll just redirect with a success message
    
    req.flash('success_msg', 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    res.redirect('/contact');
  },

  // Render 404 page
  render404: (req, res) => {
    res.status(404).render('404', {
      title: '404 - Sayfa Bulunamadı'
    });
  }
};

module.exports = indexController;
