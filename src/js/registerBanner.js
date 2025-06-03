export default class RegisterBanner {
  constructor() {
    this.bannerShown = localStorage.getItem('bannerShown');
    this.init();
  }

  init() {
    if (!this.bannerShown) {
      this.createBanner();
      localStorage.setItem('bannerShown', 'true');
    }
  }

  createBanner() {
    const banner = document.createElement('div');
    banner.className = 'register-banner';
    banner.innerHTML = `
      <div class="register-banner-content">
        <button class="close-banner">&times;</button>
        <h2>Welcome to Sleep Outside! 🏕️</h2>
        <p>Join our community and get a chance to win amazing outdoor gear!</p>
        <div class="banner-features">
          <p>🎁 Register now and get:</p>
          <ul>
            <li>Entry into our monthly gear giveaway</li>
            <li>Exclusive member discounts</li>
            <li>Early access to new products</li>
          </ul>
        </div>
        <a href="/register.html" class="register-button">Register Now</a>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listener for close button
    const closeButton = banner.querySelector('.close-banner');
    closeButton.addEventListener('click', () => {
      banner.remove();
    });
  }
} 