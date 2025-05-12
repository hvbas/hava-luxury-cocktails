// Sidebar Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get sidebar elements
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebarMenu = document.querySelector('.sidebar-menu');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const sidebarClose = document.querySelector('.sidebar-close');
  
  // Toggle sidebar when menu button is clicked
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebarMenu.classList.add('active');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    });
  }
  
  // Close sidebar when close button is clicked
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function() {
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }
  
  // Close sidebar when overlay is clicked
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function() {
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }
  
  // Close sidebar when escape key is pressed
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && sidebarMenu.classList.contains('active')) {
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });
  
  // Add hover effect to navbar links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const underline = this.querySelector('.underline');
      if (underline) {
        underline.style.width = '80%';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const underline = this.querySelector('.underline');
      if (underline && !this.classList.contains('active')) {
        underline.style.width = '0';
      }
    });
    
    // Set active link underline
    if (link.classList.contains('active')) {
      const underline = link.querySelector('.underline');
      if (underline) {
        underline.style.width = '80%';
      }
    }
  });
});
