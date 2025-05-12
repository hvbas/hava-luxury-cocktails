// Custom file input to override browser's default language
document.addEventListener('DOMContentLoaded', function() {
  // Find all file inputs on the page
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    // Get the parent element
    const parent = input.parentNode;
    
    // Create a simple wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-file-input-wrapper';
    wrapper.style.marginTop = '10px';
    
    // Create the custom button
    const customButton = document.createElement('button');
    customButton.type = 'button';
    customButton.className = 'custom-file-button';
    customButton.innerHTML = '<i class="fas fa-upload me-2"></i>Choose File';
    customButton.style.background = 'linear-gradient(to right, var(--gold), var(--gold-dark))';
    customButton.style.color = 'var(--dark)';
    customButton.style.border = 'none';
    customButton.style.padding = '8px 15px';
    customButton.style.borderRadius = '4px';
    customButton.style.cursor = 'pointer';
    customButton.style.fontFamily = "'Montserrat', sans-serif";
    customButton.style.fontSize = '0.85rem';
    customButton.style.letterSpacing = '1px';
    
    // Create the filename display
    const filenameDisplay = document.createElement('span');
    filenameDisplay.className = 'filename-display';
    filenameDisplay.textContent = 'No file selected';
    filenameDisplay.style.marginLeft = '10px';
    filenameDisplay.style.color = 'var(--cream)';
    filenameDisplay.style.fontFamily = "'Montserrat', sans-serif";
    filenameDisplay.style.fontSize = '0.85rem';
    
    // Add click event to the custom button to trigger the file input
    customButton.addEventListener('click', function(e) {
      e.preventDefault();
      input.click(); // This triggers the file selection dialog
    });
    
    // Add event listener to update the filename display
    input.addEventListener('change', function() {
      if (this.files.length > 0) {
        filenameDisplay.textContent = this.files[0].name;
      } else {
        filenameDisplay.textContent = 'No file selected';
      }
    });
    
    // Hide the original file input but keep it functional
    input.style.display = 'none';
    
    // Create a container for the button and filename
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    
    // Append elements
    container.appendChild(customButton);
    container.appendChild(filenameDisplay);
    wrapper.appendChild(container);
    
    // Insert the wrapper after the input
    input.parentNode.insertBefore(wrapper, input.nextSibling);
  });
});
