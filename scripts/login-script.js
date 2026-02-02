// login-script.js - enhanced login functionality for bearbot
// Attribution: CIS 376, barrycumbie

console.log("💡 Dev password hint: lasagna");

document.addEventListener('DOMContentLoaded', function () {
  setupLoginForm();
  setupPasswordToggle();
  console.log('Login form initialized');
});

function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    handleLogin();
  });
}

function setupPasswordToggle() {
  const toggleBtn = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', function() {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleBtn.innerHTML = isPassword 
        ? '<i class="bi bi-eye-slash"></i>' 
        : '<i class="bi bi-eye"></i>';
    });
  }
}

function handleLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('login-message');

  // Clear previous messages
  if (messageDiv) {
    messageDiv.textContent = '';
    messageDiv.className = 'alert';
  }

  // Basic validation
  if (!username || !password) {
    showMessage('Please enter both username and password.', 'danger');
    return;
  }

  // Password validation (dev password: lasagna)
  const validPasswords = ['lasagna', 'bearbot', 'password123'];
  const isValidPassword = validPasswords.includes(password.toLowerCase());

  if (!isValidPassword) {
    showMessage('Invalid password. Please try again.', 'danger');
    console.log('Login failed for user:', username);
    
    // Track failed attempts
    const attempts = parseInt(sessionStorage.getItem('loginAttempts') || '0') + 1;
    sessionStorage.setItem('loginAttempts', attempts.toString());
    
    return;
  }

  // Successful login
  const loginData = {
    username: username,
    loginTime: new Date().toISOString(),
    sessionId: generateSessionId()
  };

  // Store login data
  sessionStorage.setItem('currentUser', username);
  sessionStorage.setItem('loginTime', loginData.loginTime);
  sessionStorage.setItem('sessionId', loginData.sessionId);
  sessionStorage.setItem('isLoggedIn', 'true');
  
  // Clear login attempts
  sessionStorage.removeItem('loginAttempts');

  // Log success
  console.log('Login successful:', loginData);
  console.log('Password validated for:', username);

  // Show success message and redirect
  showMessage('Login successful! Redirecting...', 'success');
  
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 1500);
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('login-message');
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
  }
}

function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Page protection function
function requireLogin() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const currentUser = sessionStorage.getItem('currentUser');
  
  if (!isLoggedIn || !currentUser) {
    alert('Please log in to access this page.');
    window.location.href = 'login.html';
    return false;
  }
  
  console.log('User authenticated:', currentUser);
  return true;
}

// Export for use in other scripts
window.requireLogin = requireLogin;


