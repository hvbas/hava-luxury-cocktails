// Fix for missing cocktail images
document.addEventListener('DOMContentLoaded', function() {
  // Fix all cocktail images
  const cocktailImages = document.querySelectorAll('.cocktail-img');
  
  cocktailImages.forEach(img => {
    // Set default image if src is empty or invalid
    img.onerror = function() {
      this.src = '/images/cocktails/default-cocktail.jpg';
      this.onerror = null; // Prevent infinite loop
    };
    
    // If image src is empty, set default
    if (!img.src || img.src === window.location.href) {
      img.src = '/images/cocktails/default-cocktail.jpg';
    }
  });
  
  // Fix text contrast issues
  const cardTexts = document.querySelectorAll('.card-text');
  cardTexts.forEach(text => {
    text.style.color = '#f5f5f5';
    text.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
  });
  
  // Fix rating display
  const ratings = document.querySelectorAll('.rating');
  ratings.forEach(rating => {
    rating.style.backgroundColor = 'rgba(20, 20, 20, 0.8)';
    rating.style.padding = '0.2rem 0.5rem';
    rating.style.borderRadius = '4px';
    rating.style.border = '1px solid var(--gold-dark)';
  });
  
  // Fix View Recipe buttons
  const viewButtons = document.querySelectorAll('.btn-sm');
  viewButtons.forEach(btn => {
    btn.classList.add('btn-view-recipe');
    btn.style.backgroundColor = 'var(--gold)';
    btn.style.color = 'var(--darker-color)';
    btn.style.fontWeight = '500';
  });
});
