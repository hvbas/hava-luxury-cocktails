/**
 * Main JavaScript file for Kokteyl Tarifleri Application
 */

document.addEventListener('DOMContentLoaded', function() {
  // Auto-hide flash messages after 5 seconds
  setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Handle star rating
  const starRating = document.querySelector('.star-rating');
  if (starRating) {
    const stars = starRating.querySelectorAll('input');
    const labels = starRating.querySelectorAll('label');

    stars.forEach(function(star) {
      star.addEventListener('change', function() {
        const value = this.value;
        
        // Update visual state
        labels.forEach(function(label, index) {
          if (index < value) {
            label.classList.add('active');
          } else {
            label.classList.remove('active');
          }
        });
      });
    });
  }

  // Handle dynamic ingredient fields in add/edit cocktail forms
  const addIngredientBtn = document.getElementById('add-ingredient');
  if (addIngredientBtn) {
    addIngredientBtn.addEventListener('click', function() {
      const container = document.getElementById('ingredients-container');
      const newRow = document.createElement('div');
      newRow.className = 'row ingredient-row mb-3';
      newRow.innerHTML = `
        <div class="col-md-6">
          <input type="text" class="form-control" name="ingredientNames[]" placeholder="Malzeme adı" required>
        </div>
        <div class="col-md-5">
          <input type="text" class="form-control" name="ingredientAmounts[]" placeholder="Miktar (örn: 30ml)" required>
        </div>
        <div class="col-md-1">
          <button type="button" class="btn btn-outline-danger remove-ingredient"><i class="fas fa-times"></i></button>
        </div>
      `;
      container.appendChild(newRow);
      
      // Add event listener to the new remove button
      newRow.querySelector('.remove-ingredient').addEventListener('click', function() {
        if (container.children.length > 1) {
          container.removeChild(newRow);
        }
      });
    });
    
    // Remove ingredient row
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-ingredient') || e.target.parentElement.classList.contains('remove-ingredient')) {
        const button = e.target.classList.contains('remove-ingredient') ? e.target : e.target.parentElement;
        const container = document.getElementById('ingredients-container');
        if (container.children.length > 1) {
          container.removeChild(button.closest('.ingredient-row'));
        }
      }
    });
  }

  // Handle image preview for file inputs
  const imageInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
  imageInputs.forEach(function(input) {
    input.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const preview = document.createElement('div');
        preview.className = 'mt-2';
        
        reader.onload = function(e) {
          preview.innerHTML = `
            <p class="text-success mb-1"><i class="fas fa-check-circle me-1"></i>Görsel seçildi</p>
            <img src="${e.target.result}" alt="Preview" class="img-thumbnail" style="max-height: 150px;">
          `;
        };
        
        reader.readAsDataURL(file);
        
        // Remove old preview if exists
        const oldPreview = input.nextElementSibling?.nextElementSibling;
        if (oldPreview && oldPreview.classList.contains('mt-2')) {
          oldPreview.remove();
        }
        
        input.parentNode.appendChild(preview);
      }
    });
  });

  // Handle confirmation dialogs
  const confirmForms = document.querySelectorAll('form[onsubmit*="confirm"]');
  confirmForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      const message = form.getAttribute('data-confirm-message') || 'Bu işlemi yapmak istediğinize emin misiniz?';
      if (!confirm(message)) {
        e.preventDefault();
      }
    });
  });

  // Handle search form
  const searchForm = document.querySelector('form[action="/cocktails"]');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      const searchInput = this.querySelector('input[name="search"]');
      const categorySelect = this.querySelector('select[name="category"]');
      
      // Clear empty search parameters
      if (searchInput.value.trim() === '') {
        searchInput.disabled = true;
      }
      
      if (categorySelect.value === 'all') {
        categorySelect.disabled = true;
      }
    });
  }
});
