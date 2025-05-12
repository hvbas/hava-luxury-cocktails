document.addEventListener('DOMContentLoaded', function() {
  // Find all delete buttons on the page
  const deleteButtons = document.querySelectorAll('.delete-button, button:contains("DELETE"), a:contains("DELETE")');
  
  console.log('Found delete buttons:', deleteButtons.length);
  
  // Add click event listener to each delete button
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the cocktail ID from the data attribute or parent element
      let cocktailId;
      
      if (this.dataset.id) {
        cocktailId = this.dataset.id;
      } else if (this.closest('a') && this.closest('a').href) {
        const href = this.closest('a').href;
        const match = href.match(/\/cocktails\/([^\/]+)$/);
        if (match) {
          cocktailId = match[1];
        }
      } else if (this.parentElement && this.parentElement.dataset.id) {
        cocktailId = this.parentElement.dataset.id;
      }
      
      console.log('Attempting to delete cocktail with ID:', cocktailId);
      
      if (!cocktailId) {
        console.error('Could not determine cocktail ID');
        return;
      }
      
      // Find the cocktail card or container to remove
      let cardToRemove = null;
      
      // Try to find the closest cocktail card
      cardToRemove = this.closest('.cocktail-card') || this.closest('.col-md-6') || this.closest('.col-lg-3') || this.closest('tr');
      
      if (!cardToRemove) {
        console.warn('Could not find cocktail card to remove');
      }
      
      // Confirm deletion
      if (confirm('Are you sure you want to delete this recipe?')) {
        // Make a fetch request to delete the cocktail
        fetch(`/cocktails/delete/${cocktailId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            console.log('Cocktail deleted successfully');
            
            // Remove the cocktail card from the DOM
            if (cardToRemove) {
              cardToRemove.style.transition = 'all 0.3s ease';
              cardToRemove.style.opacity = '0';
              cardToRemove.style.transform = 'scale(0.8)';
              
              setTimeout(() => {
                cardToRemove.remove();
                
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
              }, 300);
            } else {
              // If we couldn't find the card, just reload the page
              window.location.reload();
            }
          } else {
            console.error('Failed to delete cocktail');
            alert('Failed to delete recipe. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error deleting cocktail:', error);
          alert('An error occurred while deleting the recipe');
        });
      }
    });
  });
  
  // Add data-id attributes to all delete buttons
  document.querySelectorAll('.cocktail-card, .col-md-6, .col-lg-3, tr').forEach(card => {
    // Try to find the cocktail ID
    const viewLink = card.querySelector('a[href^="/cocktails/"]');
    if (viewLink) {
      const href = viewLink.getAttribute('href');
      const match = href.match(/\/cocktails\/([^\/]+)$/);
      if (match) {
        const cocktailId = match[1];
        
        // Find the delete button in this card
        const deleteButton = card.querySelector('button:contains("DELETE"), a:contains("DELETE")');
        if (deleteButton) {
          deleteButton.setAttribute('data-id', cocktailId);
          console.log('Added data-id to delete button:', cocktailId);
        }
      }
    }
  });
});
