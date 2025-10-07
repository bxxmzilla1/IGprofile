// Video player functionality
const embedFrame = document.getElementById('embedFrame');
const adOverlay = document.getElementById('adOverlay');

// Categories tags toggle functionality
let showingAllTags = false;

function toggleMoreTags() {
  const hiddenTags = document.querySelectorAll('.categories-tags .tag:nth-child(n+6)'); // Updated from n+11 to n+6
  const seeMoreElement = document.querySelector('.see-more');
  
  if (showingAllTags) {
    // Hide the additional tags
    hiddenTags.forEach(tag => {
      tag.style.display = 'none';
    });
    seeMoreElement.textContent = 'See more';
    showingAllTags = false;
  } else {
    // Show all tags
    hiddenTags.forEach(tag => {
      tag.style.display = 'inline-block';
    });
    seeMoreElement.textContent = 'See less';
    showingAllTags = true;
  }
}

// Preroll Ad functionality
let adCountdown = 5;
let skipCountdown = 5;
let adTimer;
let skipTimer;

function startPrerollAd() {
  const prerollAd = document.getElementById('prerollAd');
  const playerContainer = document.getElementById('playerContainer');
  const countdownElement = document.getElementById('countdown');
  const skipTimerElement = document.getElementById('skipTimer');
  const skipBtn = document.getElementById('skipAd');
  const prerollIframe = document.getElementById('prerollIframe');
  
  // Reload the iframe to show the embedded site
  if (prerollIframe) {
    prerollIframe.src = 'https://instachat.fun/boom';
  }
  
  // Start countdown timer (for display only, no auto-transition)
  adTimer = setInterval(() => {
    adCountdown--;
    countdownElement.textContent = adCountdown;
    
    if (adCountdown <= 0) {
      clearInterval(adTimer);
      // Don't auto-transition, just stop the countdown
    }
  }, 1000);
  
  // Start skip button countdown
  skipTimer = setInterval(() => {
    skipCountdown--;
    skipTimerElement.textContent = skipCountdown;
    
    if (skipCountdown <= 0) {
      clearInterval(skipTimer);
      skipBtn.disabled = false;
      skipBtn.style.opacity = '1';
      skipBtn.style.cursor = 'pointer';
    }
  }, 1000);
  
  // Skip button click handler
  skipBtn.addEventListener('click', () => {
    if (!skipBtn.disabled) {
      clearInterval(adTimer);
      clearInterval(skipTimer);
      showMainVideo();
    }
  });
}

function showMainVideo() {
  const prerollAd = document.getElementById('prerollAd');
  const playerContainer = document.getElementById('playerContainer');
  const prerollIframe = document.getElementById('prerollIframe');
  const playButton = document.getElementById('playButton');
  
  // Reset the preroll iframe (clear the embedded site)
  if (prerollIframe) {
    prerollIframe.src = 'about:blank';
  }
  
  // Hide preroll ad
  prerollAd.style.display = 'none';
  
  // Hide the play button overlay
  if (playButton) {
    playButton.style.display = 'none';
  }
  
  // Show main video player
  playerContainer.style.display = 'block';
  
  // Reset timers for future clicks
  adCountdown = 5;
  skipCountdown = 5;
  const countdownElement = document.getElementById('countdown');
  const skipTimerElement = document.getElementById('skipTimer');
  const skipBtn = document.getElementById('skipAd');
  
  if (countdownElement) countdownElement.textContent = adCountdown;
  if (skipTimerElement) skipTimerElement.textContent = skipCountdown;
  if (skipBtn) {
    skipBtn.disabled = true;
    skipBtn.style.opacity = '0.6';
    skipBtn.style.cursor = 'not-allowed';
  }
}

// Action buttons functionality
function initializeActionButtons() {
  const actionButtons = document.querySelectorAll('.action-btn');
  
  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle selected state
      button.classList.toggle('selected');
      
      // Handle specific button actions
      if (button.classList.contains('like-btn')) {
        // Update like count if needed
        const countElement = button.querySelector('.count');
        if (countElement && button.classList.contains('selected')) {
          // Increment count (you can customize this logic)
          const currentCount = parseInt(countElement.textContent.replace(/[^\d]/g, ''));
          countElement.textContent = (currentCount + 1) + 'K';
        }
      }
      
      // Handle mutual exclusivity for like/dislike
      if (button.classList.contains('like-btn') && button.classList.contains('selected')) {
        const dislikeBtn = document.querySelector('.dislike-btn');
        if (dislikeBtn && dislikeBtn.classList.contains('selected')) {
          dislikeBtn.classList.remove('selected');
        }
      } else if (button.classList.contains('dislike-btn') && button.classList.contains('selected')) {
        const likeBtn = document.querySelector('.like-btn');
        if (likeBtn && likeBtn.classList.contains('selected')) {
          likeBtn.classList.remove('selected');
        }
      }
    });
  });
}

// Initialize play button functionality when page loads
document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const prerollAd = document.getElementById('prerollAd');
  const playerContainer = document.getElementById('playerContainer');
  
  // Initialize action buttons
  initializeActionButtons();
  
  // Play button click handler
  playButton.addEventListener('click', () => {
    // Hide the main player
    playerContainer.style.display = 'none';
    
    // Show preroll ad
    prerollAd.style.display = 'block';
    
    // Start the preroll ad
    startPrerollAd();
  });
});

