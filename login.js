document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    // Check if user was redirected from signup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
        // Show success message
        errorMessage.textContent = 'Account created successfully! Please sign in.';
        errorMessage.classList.remove('hidden');
        errorMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        errorMessage.style.color = '#10b981';
    }

    // Toggle password visibility
    togglePasswordButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle icon
        const icon = togglePasswordButton.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
        errorMessage.style.backgroundColor = '';
        errorMessage.style.color = '';
        
        // Disable button and show loading state
        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Demo credentials check
            if (email === 'demo@example.com' && password === 'password') {
                // Successful login - redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Show error
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.classList.remove('hidden');
                errorMessage.style.backgroundColor = '';
                errorMessage.style.color = '';
                
                // Reset button
                loginButton.disabled = false;
                loginButton.textContent = 'Sign in';
            }
        }, 1000);
    });
});