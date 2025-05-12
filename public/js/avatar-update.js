// Custom script to update user avatar
document.addEventListener('DOMContentLoaded', function() {
  // Create luxury avatar options
  const avatarOptions = [
    { name: 'luxury-avatar-1.png', label: 'Gold Cocktail Glass' },
    { name: 'luxury-avatar-2.png', label: 'Martini Glass' },
    { name: 'luxury-avatar-3.png', label: 'Whiskey Glass' },
    { name: 'luxury-avatar-4.png', label: 'Wine Glass' },
    { name: 'luxury-avatar-5.png', label: 'Champagne Glass' }
  ];
  
  // Find the avatar selection container if it exists
  const avatarContainer = document.getElementById('avatar-selection');
  if (avatarContainer) {
    // Create avatar selection options
    avatarOptions.forEach(avatar => {
      const option = document.createElement('div');
      option.className = 'avatar-option';
      option.innerHTML = `
        <input type="radio" name="avatar" id="avatar-${avatar.name}" value="${avatar.name}" class="avatar-radio">
        <label for="avatar-${avatar.name}" class="avatar-label">
          <img src="/images/avatars/${avatar.name}" alt="${avatar.label}" class="avatar-preview">
          <span>${avatar.label}</span>
        </label>
      `;
      avatarContainer.appendChild(option);
    });
  }
  
  // Replace default avatar with luxury icon in navbar
  const navbarAvatar = document.querySelector('.navbar-nav .rounded-circle');
  if (navbarAvatar) {
    // Get current avatar path
    const currentSrc = navbarAvatar.getAttribute('src');
    
    // If it's the default avatar, replace with a luxury icon
    if (currentSrc.includes('default-avatar.png')) {
      // Create a luxury icon instead of using an image
      const parent = navbarAvatar.parentNode;
      
      // Create luxury icon element
      const luxuryIcon = document.createElement('div');
      luxuryIcon.className = 'luxury-avatar-icon me-2';
      luxuryIcon.innerHTML = '<i class="fas fa-glass-martini-alt"></i>';
      luxuryIcon.style.width = '30px';
      luxuryIcon.style.height = '30px';
      luxuryIcon.style.borderRadius = '50%';
      luxuryIcon.style.backgroundColor = 'var(--gold)';
      luxuryIcon.style.color = 'var(--dark)';
      luxuryIcon.style.display = 'flex';
      luxuryIcon.style.alignItems = 'center';
      luxuryIcon.style.justifyContent = 'center';
      luxuryIcon.style.fontSize = '16px';
      luxuryIcon.style.border = '1px solid var(--gold-dark)';
      
      // Replace the image with our luxury icon
      parent.replaceChild(luxuryIcon, navbarAvatar);
    }
  }
});
