// Luxury Menu Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Menu hover effects
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const underline = this.querySelector('.underline');
      if (underline) {
        underline.style.width = '80%';
      }
      
      // Add subtle glow effect
      this.style.textShadow = '0 0 8px rgba(212, 175, 55, 0.5)';
      this.style.color = '#FFD700';
    });
    
    link.addEventListener('mouseleave', function() {
      const underline = this.querySelector('.underline');
      if (underline && !this.classList.contains('active')) {
        underline.style.width = '0';
      }
      
      // Remove glow effect
      this.style.textShadow = 'none';
      if (!this.classList.contains('active')) {
        this.style.color = '';
      }
    });
  });
  
  // Set active link underline
  const activeLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link.active');
  activeLinks.forEach(link => {
    const underline = link.querySelector('.underline');
    if (underline) {
      underline.style.width = '80%';
    }
    link.style.color = '#FFD700';
  });
  
  // Dropdown menu hover effects
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});
