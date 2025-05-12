// This script adds click event listeners to all delete buttons
document.addEventListener('DOMContentLoaded', function() {
  console.log('Delete fix script loaded');
  
  // Find all delete buttons - using multiple selectors to catch all possible buttons
  const deleteButtons = document.querySelectorAll('button:contains("DELETE"), a:contains("DELETE"), .delete-link, [class*="delete"], .btn-outline-danger');
  
  console.log('Found potential delete buttons:', deleteButtons.length);
  
  // Process each button
  deleteButtons.forEach(button => {
    console.log('Processing button:', button.outerHTML);
    
    // Add click event listener
    button.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      console.log('Delete button clicked');
      
      // Find the cocktail ID
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
      
      // Try to get ID from parent form action
      if (!cocktailId && this.closest('form')) {
        const form = this.closest('form');
        const actionMatch = form.action.match(/\/cocktails\/(?:delete\/)?([^\/]+)$/);
        if (actionMatch) {
          cocktailId = actionMatch[1];
        }
      }
      
      // Try to get ID from nearby view recipe link
      if (!cocktailId) {
        const card = this.closest('.card') || this.closest('.col-md-6') || this.closest('.col-lg-3') || this.closest('tr');
        if (card) {
          const viewLink = card.querySelector('a[href^="/cocktails/"]');
          if (viewLink) {
            const match = viewLink.href.match(/\/cocktails\/([^\/]+)$/);
            if (match) {
              cocktailId = match[1];
            }
          }
        }
      }
      
      console.log('Cocktail ID found:', cocktailId);
      
      if (!cocktailId) {
        console.error('Could not determine cocktail ID');
        alert('Could not determine which recipe to delete. Please try again.');
        return;
      }
      
      // Find the card or container to remove
      const card = this.closest('.card') || this.closest('.col-md-6') || this.closest('.col-lg-3') || this.closest('tr');
      
      // Confirm deletion
      if (confirm('Are you sure you want to delete this recipe?')) {
        console.log('Deletion confirmed, sending request to:', `/cocktails/delete/${cocktailId}`);
        
        // Send deletion request
        fetch(`/cocktails/delete/${cocktailId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          console.log('Delete response status:', response.status);
          if (response.ok) {
            console.log('Delete successful');
            
            // Remove the card with animation
            if (card) {
              card.style.transition = 'all 0.5s ease';
              card.style.opacity = '0';
              card.style.transform = 'scale(0.8)';
              
              setTimeout(() => {
                card.remove();
                console.log('Card removed from DOM');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success';
                successMsg.style.position = 'fixed';
                successMsg.style.top = '20px';
                successMsg.style.left = '50%';
                successMsg.style.transform = 'translateX(-50%)';
                successMsg.style.zIndex = '9999';
                successMsg.style.padding = '10px 20px';
                successMsg.textContent = 'Recipe successfully deleted';
                document.body.appendChild(successMsg);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                  successMsg.style.opacity = '0';
                  setTimeout(() => successMsg.remove(), 500);
                }, 3000);
              }, 500);
            } else {
              // If we couldn't find the card, reload the page
              window.location.reload();
            }
          } else {
            console.error('Delete request failed');
            alert('Failed to delete recipe. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error during delete request:', error);
          alert('An error occurred while deleting the recipe. Please try again.');
        });
      }
    });
  });
  
  // Add direct click handlers to all delete buttons
  document.querySelectorAll('button, a').forEach(el => {
    if (el.textContent.includes('DELETE') || el.classList.contains('delete-link') || el.classList.contains('btn-outline-danger')) {
      console.log('Adding direct click handler to:', el.outerHTML);
      
      el.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Direct click handler triggered');
        
        // Find the closest card or row
        const card = this.closest('.card') || this.closest('.col-md-6') || this.closest('.col-lg-3') || this.closest('tr');
        
        // Get cocktail ID from the URL or data attribute
        let cocktailId = null;
        
        if (this.href) {
          const match = this.href.match(/\/cocktails\/(?:delete\/)?([^\/]+)$/);
          if (match) {
            cocktailId = match[1];
          }
        }
        
        if (!cocktailId && card) {
          const viewLink = card.querySelector('a[href^="/cocktails/"]');
          if (viewLink) {
            const match = viewLink.href.match(/\/cocktails\/([^\/]+)$/);
            if (match) {
              cocktailId = match[1];
            }
          }
        }
        
        if (!cocktailId) {
          console.error('Could not determine cocktail ID');
          return;
        }
        
        if (confirm('Are you sure you want to delete this recipe?')) {
          // Just redirect to the delete URL
          window.location.href = `/cocktails/delete/${cocktailId}`;
        }
        
        return false;
      };
    }
  });
});
