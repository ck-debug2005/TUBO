function initMobileNavToggle() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  if (!navbar || !navLinks) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-nav-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation');
  toggleBtn.innerHTML = '☰';

  navbar.insertBefore(toggleBtn, navbar.firstChild);

  injectMobileToggleStyles();

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
    toggleBtn.innerHTML = navLinks.classList.contains('show') ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      toggleBtn.innerHTML = '☰';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      toggleBtn.innerHTML = '☰';
    }
  });
}

function injectMobileToggleStyles() {
  if (document.getElementById('mobile-toggle-styles')) return;
  const style = document.createElement('style');
  style.id = 'mobile-toggle-styles';
  style.textContent = `
    .mobile-nav-toggle {
      display: none;
      background: none;
      border: 2px solid rgba(255,255,255,0.3);
      font-size: 2rem;
      color: white;
      cursor: pointer;
      padding: 0.2rem 1rem;
      border-radius: 8px;
      line-height: 1;
      margin-right: auto;
    }
    .mobile-nav-toggle:hover {
      background-color: rgba(255,255,255,0.1);
    }
    @media screen and (max-width: 768px) {
      .mobile-nav-toggle {
        display: block;
      }
      .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        background-color: #2c3e50;
        padding: 1rem 0;
        border-radius: 8px;
        margin-top: 0.5rem;
      }
      .nav-links.show {
        display: flex;
      }
      .navbar {
        flex-wrap: wrap;
      }
      .nav-links li {
        width: 100%;
        text-align: center;
      }
      .nav-btn {
        display: block;
        margin: 0.2rem 1rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function initFormValidation() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;

  const contactContainer = document.querySelector('.contact-container');
  if (contactContainer && !document.querySelector('.contact-form')) {
    const formDiv = document.createElement('div');
    formDiv.className = 'contact-form';
    formDiv.innerHTML = `
      <h3>Send a Message</h3>
      <form id="contactForm" novalidate>
        <div class="form-group" id="name-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" placeholder="Your name" required>
          <small class="error-message" id="name-error">Please enter your name.</small>
        </div>
        <div class="form-group" id="email-group">
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
          <small class="error-message" id="email-error">Please enter your email address.</small>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="3" placeholder="Optional message"></textarea>
        </div>
        <button type="submit" class="submit-btn">Send</button>
      </form>
    `;
    contactContainer.appendChild(formDiv);
  }

  injectFormValidationStyles();

  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameGroup = document.getElementById('name-group');
  const emailGroup = document.getElementById('email-group');

  if (nameError) nameError.style.display = 'none';
  if (emailError) emailError.style.display = 'none';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (!nameInput.value.trim()) {
      isValid = false;
      nameGroup.classList.add('error');
      nameError.style.display = 'block';
      nameInput.style.borderColor = 'red';
    } else {
      nameGroup.classList.remove('error');
      nameError.style.display = 'none';
      nameInput.style.borderColor = '#ddd';
    }

    if (!emailInput.value.trim()) {
      isValid = false;
      emailGroup.classList.add('error');
      emailError.style.display = 'block';
      emailInput.style.borderColor = 'red';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        emailGroup.classList.add('error');
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.style.borderColor = 'red';
      } else {
        emailGroup.classList.remove('error');
        emailError.style.display = 'none';
        emailInput.style.borderColor = '#ddd';
      }
    }

    if (isValid) {
      alert('Form validated successfully! (No data sent – demo)');
      form.reset();
    }
  });

  nameInput.addEventListener('input', () => {
    nameGroup.classList.remove('error');
    nameError.style.display = 'none';
    nameInput.style.borderColor = '#ddd';
  });

  emailInput.addEventListener('input', () => {
    emailGroup.classList.remove('error');
    emailError.style.display = 'none';
    emailInput.style.borderColor = '#ddd';
  });
}

function injectFormValidationStyles() {
  if (document.getElementById('form-validation-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'form-validation-styles';
  style.textContent = `
    .form-group {
      position: relative;
      margin-bottom: 1.5rem;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 0.3rem;
      display: none;
      font-weight: normal;
    }
    
    .form-group.error input {
      border-color: #e74c3c !important;
    }
    
    .form-group.error .error-message {
      display: block;
    }
    
    body.dark-mode .error-message {
      color: #ff6b6b;
    }
    
    body.dark-mode .form-group.error input {
      border-color: #ff6b6b !important;
    }
  `;
  
  document.head.appendChild(style);
}

function initDarkModeToggle() {
  const footer = document.querySelector('footer .footer-content');
  if (!footer) return;

  if (document.getElementById('darkmode-toggle')) return;

  const darkModeBtn = document.createElement('button');
  darkModeBtn.id = 'darkmode-toggle';
  darkModeBtn.className = 'dark-mode-btn';
  darkModeBtn.innerHTML = '🌙 Dark Mode';
  darkModeBtn.setAttribute('aria-label', 'Toggle dark mode');

  injectDarkModeStyles();

  footer.appendChild(darkModeBtn);

  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '☀️ Light Mode';
  }

  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeBtn.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}

function injectDarkModeStyles() {
  if (document.getElementById('darkmode-styles')) return;
  const style = document.createElement('style');
  style.id = 'darkmode-styles';
  style.textContent = `
    body.dark-mode {
      background-color: #121212;
      color: #e0e0e0;
    }
    body.dark-mode main {
      background-color: #1e1e1e;
    }
    body.dark-mode header {
      background: linear-gradient(135deg, #1a2634, #1e3b5c);
    }
    body.dark-mode .section {
      background-color: #1e1e1e;
    }
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode .hero-text h3 {
      color: #bb86fc;
    }
    body.dark-mode .about-text,
    body.dark-mode .contact-info,
    body.dark-mode .contact-form {
      background-color: #2c2c2c;
      color: #ddd;
    }
    body.dark-mode .skills-list li {
      background-color: #3700b3;
    }
    body.dark-mode .project-card {
      background: #2c2c2c;
      color: #e0e0e0;
    }
    body.dark-mode .nav-card {
      background: #2c2c2c;
    }
    body.dark-mode footer {
      background: linear-gradient(135deg, #1a2634, #1e3b5c);
    }
    body.dark-mode .nav-btn {
      background-color: #2c2c2c;
      border-color: #555;
    }
    body.dark-mode .nav-btn:hover {
      background-color: #bb86fc;
      color: #000;
    }
    body.dark-mode .submit-btn {
      background-color: #bb86fc;
      color: #000;
    }
    body.dark-mode input,
    body.dark-mode textarea {
      background-color: #333;
      color: #fff;
      border-color: #555;
    }
    .dark-mode-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      margin: 0.5rem;
      transition: background 0.3s;
    }
    .dark-mode-btn:hover {
      background: #2c3e50;
    }
    body.dark-mode .dark-mode-btn {
      background: #bb86fc;
      color: #000;
    }
  `;
  document.head.appendChild(style);
}

window.addEventListener('load', () => {
  initMobileNavToggle();
  initFormValidation();
  initDarkModeToggle();
});