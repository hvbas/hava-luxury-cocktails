document.addEventListener('DOMContentLoaded', function() {
  // Handle delete forms
  const deleteForms = document.querySelectorAll('.delete-form');
  
  deleteForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Don't prevent default - let the form submit normally
      // Just confirm the deletion
      if (!confirm('Are you sure you want to delete this recipe?')) {
        e.preventDefault();
        return false;
      }
      
      // Let the form submit normally with the _method=DELETE hidden input
      return true;
    });
  });
  
  // Handle delete links
  const deleteLinks = document.querySelectorAll('.delete-link');
  
  deleteLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent the default action
      e.preventDefault();
      
      // Ask for confirmation
      if (confirm('Are you sure you want to delete this recipe?')) {
        // If confirmed, navigate to the delete URL
        window.location.href = this.getAttribute('href');
      }
    });
  });
});
