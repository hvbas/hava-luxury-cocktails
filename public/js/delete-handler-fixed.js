// New delete handler script with improved reliability
document.addEventListener('DOMContentLoaded', function() {
  console.log('Delete handler script loaded');
  
  // Find all delete buttons/links on the page
  const deleteButtons = document.querySelectorAll('.delete-button, a.btn-danger, button.btn-danger, a:contains("DELETE"), button:contains("DELETE")');
  
  console.log('Found delete buttons:', deleteButtons.length);
  
  // Add click event listener to each delete button
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent the default action
      e.preventDefault();
      e.stopPropagation();
      
      // Get the cocktail ID
      let cocktailId = null;
      
      // Try to get ID from data attribute
      if (this.dataset && this.dataset.id) {
        cocktailId = this.dataset.id;
      }
      
      // Try to get ID from href attribute
      if (!cocktailId && this.href) {
        const match = this.href.match(/\/cocktails\/(?:delete\/)?([^\/]+)$/);
        if (match) {
          cocktailId = match[1];
        }
      }
      
      // Try to get ID from parent element with data-id
      if (!cocktailId && this.closest('[data-id]')) {
        cocktailId = this.closest('[data-id]').dataset.id;
      }
      
      // Try to get ID from nearby view link
      if (!cocktailId) {
        const card = this.closest('.card') || this.closest('.cocktail-card') || 
                     this.closest('.col-md-6') || this.closest('.col-lg-3') || 
                     this.closest('tr');
        
        if (card) {
          const viewLink = card.querySelector('a[href^="/cocktails/"]');
          if (viewLink && viewLink.href) {
            const match = viewLink.href.match(/\/cocktails\/([^\/]+)$/);
            if (match) {
              cocktailId = match[1];
            }
          }
        }
      }
      
      console.log('Cocktail ID for deletion:', cocktailId);
      
      if (!cocktailId) {
        console.error('Could not determine cocktail ID');
        alert('Could not determine which recipe to delete.');
        return;
      }
      
      // Find the card to remove
      const card = this.closest('.card') || this.closest('.cocktail-card') || 
                   this.closest('.col-md-6') || this.closest('.col-lg-3') || 
                   this.closest('tr');
      
      // Confirm deletion
      if (confirm('Are you sure you want to delete this recipe?')) {
        console.log('Deletion confirmed, sending request to:', `/cocktails/delete/${cocktailId}`);
        
        // Immediately hide the card with animation
        if (card) {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
        
        // Send a fetch request to delete the cocktail
        fetch(`/cocktails/delete/${cocktailId}`, {
          method: 'GET'
        })
        .then(response => {
          if (response.ok) {
            console.log('Cocktail deleted successfully');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success';
            successMsg.textContent = 'Recipe successfully deleted';
            successMsg.style.position = 'fixed';
            successMsg.style.top = '20px';
            successMsg.style.left = '50%';
            successMsg.style.transform = 'translateX(-50%)';
            successMsg.style.zIndex = '9999';
            document.body.appendChild(successMsg);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
              successMsg.style.opacity = '0';
              setTimeout(() => successMsg.remove(), 300);
            }, 3000);
            
            // Completely remove the card from DOM after animation
            if (card) {
              setTimeout(() => {
                card.remove();
              }, 500);
            }
          } else {
            console.error('Failed to delete cocktail');
            
            // If deletion failed, show the card again
            if (card) {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
              card.style.display = '';
            }
            
            // Show error message
            alert('Failed to delete recipe. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error deleting cocktail:', error);
          
          // If deletion failed, show the card again
          if (card) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.display = '';
          }
          
          // Show error message
          alert('An error occurred while deleting the recipe');
        });
      }
    });
  });
  
  // Add data-id attributes to all delete buttons in cocktail cards
  document.querySelectorAll('.cocktail-card, .card, .col-md-6, .col-lg-3, tr').forEach(card => {
    // Try to find the cocktail ID from a view link
    const viewLink = card.querySelector('a[href^="/cocktails/"]');
    if (viewLink && viewLink.href) {
      const match = viewLink.href.match(/\/cocktails\/([^\/]+)$/);
      if (match) {
        const cocktailId = match[1];
        
        // Find all delete buttons in this card
        const deleteButtons = card.querySelectorAll('.delete-button, a.btn-danger, button.btn-danger, a:contains("DELETE"), button:contains("DELETE")');
        deleteButtons.forEach(button => {
          button.setAttribute('data-id', cocktailId);
          console.log('Added data-id to delete button:', cocktailId);
        });
      }
    }
  });
});
