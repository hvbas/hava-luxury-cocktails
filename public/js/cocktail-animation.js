// Cocktail-themed animation for the luxury cocktail app
document.addEventListener('DOMContentLoaded', function() {
  // Only run on the home page
  if (window.location.pathname === '/' || window.location.pathname === '/index') {
    // Create animated cocktail elements
    createCocktailElements();
  }
  
  // Initialize the particles animation
  initParticles();
});

// Initialize particles.js with luxury cocktail theme
function initParticles() {
  // Create a particles container if it doesn't exist
  if (!document.getElementById('particles-js')) {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-1';
    particlesContainer.style.pointerEvents = 'none';
    document.body.insertBefore(particlesContainer, document.body.firstChild);
  }
  
  // Luxury cocktail-themed particles configuration
  const particlesConfig = {
    "particles": {
      "number": {
        "value": 60,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#d4af37", "#ffffff", "#ffd700", "#ffcc00"]
      },
      "shape": {
        "type": ["circle", "triangle"],
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 6
        }
      },
      "opacity": {
        "value": 0.2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.3,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#d4af37",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 200,
          "size": 6,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

  // Load particles.js and apply configuration
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', particlesConfig);
  } else {
    // If particles.js is not loaded yet, load it dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
      particlesJS('particles-js', particlesConfig);
    };
    document.body.appendChild(script);
  }
}

// Create animated cocktail elements
function createCocktailElements() {
  const container = document.getElementById('cocktail-animation-container');
  if (!container) return;
  
  // Clear any existing elements
  container.innerHTML = '';
  
  // Create cocktail glass SVG
  const glassIcon = document.createElement('div');
  glassIcon.className = 'position-absolute';
  glassIcon.style.bottom = '-100px';
  glassIcon.style.left = '10%';
  glassIcon.style.opacity = '0.15';
  glassIcon.style.transform = 'scale(0.8)';
  glassIcon.style.animation = 'float-up 15s infinite ease-in-out';
  glassIcon.innerHTML = `<svg width="80" height="80" viewBox="0 0 24 24" fill="#d4af37">
    <path d="M8 2h8v2h-8zM6 6l1 15h10l1-15h-12zM17 4l-0.4 2h-9.2l-0.4-2h10z"></path>
  </svg>`;
  container.appendChild(glassIcon);
  
  // Create martini glass SVG
  const martiniIcon = document.createElement('div');
  martiniIcon.className = 'position-absolute';
  martiniIcon.style.bottom = '-100px';
  martiniIcon.style.right = '15%';
  martiniIcon.style.opacity = '0.15';
  martiniIcon.style.transform = 'scale(0.7)';
  martiniIcon.style.animation = 'float-up 18s 3s infinite ease-in-out';
  martiniIcon.innerHTML = `<svg width="80" height="80" viewBox="0 0 24 24" fill="#d4af37">
    <path d="M12 2c1.105 0 2 0.895 2 2h-4c0-1.105 0.895-2 2-2zM5 6l7 7v9h-4v-2h2v-5l-7-7h2zM19 6l-7 7v9h4v-2h-2v-5l7-7h-2z"></path>
  </svg>`;
  container.appendChild(martiniIcon);
  
  // Create shaker SVG
  const shakerIcon = document.createElement('div');
  shakerIcon.className = 'position-absolute';
  shakerIcon.style.bottom = '-100px';
  shakerIcon.style.left = '30%';
  shakerIcon.style.opacity = '0.15';
  shakerIcon.style.transform = 'scale(0.6)';
  shakerIcon.style.animation = 'float-up 20s 6s infinite ease-in-out';
  shakerIcon.innerHTML = `<svg width="80" height="80" viewBox="0 0 24 24" fill="#d4af37">
    <path d="M9 3h6v2h-6zM8 5h8l1 5h-10zM7 10h10l-2 12h-6z"></path>
  </svg>`;
  container.appendChild(shakerIcon);
  
  // Create bubbles
  for (let i = 0; i < 15; i++) {
    createBubble(container);
  }
  
  // Create gold particles
  for (let i = 0; i < 20; i++) {
    createGoldParticle(container);
  }
  
  // Add CSS for animations if not already present
  if (!document.getElementById('cocktail-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'cocktail-animation-styles';
    style.textContent = `
      @keyframes float-up {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10%, 90% { opacity: 0.15; }
        50% { transform: translateY(-70vh) rotate(5deg); }
      }
      
      @keyframes bubble-rise {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 0.5; }
        100% { transform: translateY(-100vh) translateX(var(--tx)) scale(0.5); opacity: 0; }
      }
      
      @keyframes gold-particle {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        10% { opacity: 0.7; }
        100% { transform: translateY(-50vh) translateX(var(--tx)) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Create a bubble element
function createBubble(container) {
  const bubble = document.createElement('div');
  const size = Math.random() * 15 + 5;
  const posX = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = Math.random() * 10 + 10;
  const translateX = Math.random() * 100 - 50;
  
  bubble.className = 'position-absolute rounded-circle';
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.bottom = '-20px';
  bubble.style.left = `${posX}%`;
  bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))';
  bubble.style.animation = `bubble-rise ${duration}s ${delay}s infinite linear`;
  bubble.style.setProperty('--tx', `${translateX}px`);
  
  container.appendChild(bubble);
}

// Create a gold particle element
function createGoldParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 8 + 2;
  const posX = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = Math.random() * 8 + 7;
  const translateX = Math.random() * 80 - 40;
  
  particle.className = 'position-absolute';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.bottom = '-10px';
  particle.style.left = `${posX}%`;
  particle.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.8), rgba(212, 175, 55, 0.3))';
  particle.style.borderRadius = '50%';
  particle.style.animation = `gold-particle ${duration}s ${delay}s infinite ease-out`;
  particle.style.setProperty('--tx', `${translateX}px`);
  
  container.appendChild(particle);
}
