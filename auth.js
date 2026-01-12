// Authentication Script - Works with both plain-login.html and bs5-login.html
// Password hint: lasagna

// Display password hint in console
console.log('%c🔐 Password Hint for Login', 'background: #667eea; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%cThe correct password is: lasagna', 'color: #764ba2; font-size: 14px; font-weight: bold;');
console.log('%c---', 'color: #ccc;');

// Function to view session storage contents
window.viewSession = function() {
    console.log('%c📦 Current Session Storage:', 'background: #28a745; color: white; padding: 8px; font-size: 14px; font-weight: bold;');
    
    if (sessionStorage.length === 0) {
        console.log('%cNo data in session storage', 'color: #6c757d; font-style: italic;');
    } else {
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            console.log(`%c${key}:`, 'color: #667eea; font-weight: bold;', value);
        }
    }
    console.log('%c---', 'color: #ccc;');
    return 'Session data displayed above ☝️';
};

// Function to clear session storage
window.clearSession = function() {
    sessionStorage.clear();
    console.log('%c🗑️ Session storage cleared!', 'background: #dc3545; color: white; padding: 8px; font-weight: bold;');
    return 'Session cleared successfully';
};

// Display available console commands
console.log('%c💡 Available Console Commands:', 'background: #17a2b8; color: white; padding: 8px; font-size: 14px; font-weight: bold;');
console.log('%cviewSession()', 'color: #667eea; font-weight: bold;', '- View all session storage data');
console.log('%cclearSession()', 'color: #667eea; font-weight: bold;', '- Clear all session storage data');
console.log('%c---', 'color: #ccc;');

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Store in session storage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('loginTimestamp', new Date().toISOString());
            sessionStorage.setItem('loginAttempts', (parseInt(sessionStorage.getItem('loginAttempts') || '0') + 1).toString());
            
            // Log to console
            console.log('%c🔑 Login Attempt:', 'background: #ffc107; color: black; padding: 8px; font-weight: bold;');
            console.log('%cUsername:', 'color: #667eea; font-weight: bold;', username);
            console.log('%cPassword:', 'color: #667eea; font-weight: bold;', password);
            console.log('%cTimestamp:', 'color: #667eea; font-weight: bold;', new Date().toLocaleString());
            console.log('%c---', 'color: #ccc;');
            
            // Check if password is correct
            const correctPassword = 'lasagna';
            
            if (password === correctPassword) {
                sessionStorage.setItem('isAuthenticated', 'true');
                showMessage('✅ Login successful! Welcome, ' + username + '!', 'success');
                console.log('%c✅ Authentication Successful!', 'background: #28a745; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
                
                // Show next page link/button
                showNextPageOption();
                
                // Redirect or perform action after successful login
                setTimeout(function() {
                    console.log('%cYou are now logged in!', 'color: #28a745; font-weight: bold;');
                }, 1000);
            } else {
                sessionStorage.setItem('isAuthenticated', 'false');
                showMessage('❌ Login failed! Incorrect password. (Hint: Check the console)', 'error');
                console.log('%c❌ Authentication Failed!', 'background: #dc3545; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
                console.log('%c💡 Hint: The password is "lasagna"', 'color: #ffc107; font-weight: bold;');
            }
            
            console.log('%cCall viewSession() to see all stored data', 'color: #17a2b8; font-style: italic;');
            console.log('%c---', 'color: #ccc;');
        });
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        // Handle different styling for plain HTML vs Bootstrap
        if (messageDiv.classList.contains('alert')) {
            // Bootstrap styling
            messageDiv.className = 'alert mt-3';
            if (type === 'success') {
                messageDiv.classList.add('alert-success');
            } else {
                messageDiv.classList.add('alert-danger');
            }
        } else {
            // Plain HTML styling
            messageDiv.className = 'message ' + type;
        }
    }
    
    function showNextPageOption() {
        // Check if we're on plain HTML or Bootstrap page
        const isBootstrap = messageDiv.classList.contains('alert');
        
        // Create next page element
        let nextElement;
        if (isBootstrap) {
            // Bootstrap button
            nextElement = document.createElement('div');
            nextElement.className = 'text-center mt-3';
            nextElement.innerHTML = '<a href="welcome.html" class="btn btn-success btn-lg"><i class="bi bi-arrow-right-circle"></i> Continue to Dashboard</a>';
        } else {
            // Plain HTML link
            nextElement = document.createElement('div');
            nextElement.style.textAlign = 'center';
            nextElement.style.marginTop = '20px';
            nextElement.innerHTML = '<a href="welcome.html" style="color: #4CAF50; font-size: 18px; text-decoration: none; font-weight: bold;">→ Continue to Next Page</a>';
        }
        
        // Insert after message
        messageDiv.parentNode.insertBefore(nextElement, messageDiv.nextSibling);
    }
    
    // Auto-display session info if user has logged in before
    if (sessionStorage.getItem('username')) {
        console.log('%c👤 Welcome back! Previous session data found:', 'background: #6c757d; color: white; padding: 8px; font-weight: bold;');
        console.log('%cCall viewSession() to see the details', 'color: #17a2b8; font-style: italic;');
        console.log('%c---', 'color: #ccc;');
    }
});
