document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const signupButton = document.getElementById('signup-button');
    const errorMessage = document.getElementById('error-message');
    const passwordStrength = document.getElementById('password-strength');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    // Toggle password visibility
    togglePasswordButton.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, togglePasswordButton);
    });

    // Toggle confirm password visibility
    toggleConfirmPasswordButton.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordButton);
    });

    // Function to toggle password visibility
    function togglePasswordVisibility(input, button) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Toggle icon
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    // Check password strength
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        
        if (password.length > 0) {
            passwordStrength.classList.remove('hidden');
            
            // Calculate strength
            let strength = 0;
            
            // Length check
            if (password.length >= 8) {
                strength += 25;
            }
            
            // Uppercase check
            if (/[A-Z]/.test(password)) {
                strength += 25;
            }
            
            // Number check
            if (/[0-9]/.test(password)) {
                strength += 25;
            }
            
            // Special character check
            if (/[^A-Za-z0-9]/.test(password)) {
                strength += 25;
            }
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            // Update color and text
            if (strength < 25) {
                strengthBar.style.backgroundColor = '#ff4d4d';
                strengthText.textContent = 'Very Weak';
            } else if (strength < 50) {
                strengthBar.style.backgroundColor = '#ffa64d';
                strengthText.textContent = 'Weak';
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#ffff4d';
                strengthText.textContent = 'Medium';
            } else if (strength < 100) {
                strengthBar.style.backgroundColor = '#4dff4d';
                strengthText.textContent = 'Strong';
            } else {
                strengthBar.style.backgroundColor = '#4dff4d';
                strengthText.textContent = 'Very Strong';
            }
        } else {
            passwordStrength.classList.add('hidden');
        }
    });

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
        
        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validate form
        if (name.length < 2) {
            showError('Name must be at least 2 characters');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showError('Password must be at least 8 characters');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        if (!termsCheckbox.checked) {
            showError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        // Disable button and show loading state
        signupButton.disabled = true;
        signupButton.textContent = 'Creating Account...';
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // In a real app, you would send the data to a server
            // For demo purposes, we'll just redirect to the login page
            window.location.href = 'login.html?registered=true';
        }, 1500);
    });

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Check if user was redirected from signup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
        // Show success message if implemented
    }
});