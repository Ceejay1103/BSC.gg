document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id === 'signupPassword') {
            input.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
    });

    // Form validation for login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Simulate login process
                simulateLogin();
            }
        });
    }

    // Form validation for signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSignupForm()) {
                // Simulate signup process
                simulateSignup();
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert(`This would authenticate with ${this.textContent.trim()} in a real application.`);
        });
    });
});

function checkPasswordStrength(password) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Reset
    strengthBars.forEach(bar => bar.style.backgroundColor = '#ddd');
    
    let strength = 0;
    let messages = [];
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Cap at 4 for our 4-bar display
    strength = Math.min(strength, 4);
    
    // Update UI
    for (let i = 0; i < strength; i++) {
        let color;
        if (strength <= 1) color = '#e74c3c'; // Weak
        else if (strength <= 3) color = '#f39c12'; // Medium
        else color = '#2ecc71'; // Strong
        
        strengthBars[i].style.backgroundColor = color;
    }
    
    // Update text
    if (password.length === 0) {
        strengthText.textContent = '';
    } else if (strength <= 1) {
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 3) {
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#f39c12';
    } else {
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#2ecc71';
    }
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    // Email validation
    if (!email.value) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    return isValid;
}

function validateSignupForm() {
    const username = document.getElementById('signupUsername');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsAgree = document.getElementById('termsAgree');
    
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    let isValid = true;
    
    // Username validation
    if (!username.value) {
        usernameError.textContent = 'Username is required';
        usernameError.style.display = 'block';
        isValid = false;
    } else if (username.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }
    
    // Email validation
    if (!email.value) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    // Confirm password validation
    if (!confirmPassword.value) {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }
    
    // Terms agreement validation
    if (!termsAgree.checked) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

function simulateLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // In a real app, you would send this to your backend
    console.log('Login attempt with:', { email, password });
    
    // Simulate API call
    setTimeout(() => {
        alert('Login successful! Redirecting to dashboard...');
        // In a real app, you would redirect or update the UI
        window.location.href = 'body.html';
    }, 1000);
}

function simulateSignup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // In a real app, you would send this to your backend
    console.log('Signup attempt with:', { username, email, password });
    
    // Simulate API call
    setTimeout(() => {
        alert('Account created successfully! Redirecting to login...');
        // In a real app, you might log them in directly or redirect to login
        window.location.href = 'Log in.html';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id === 'signupPassword') {
            input.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
    });

    // Form validation for login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Simulate login process
                simulateLogin();
            }
        });
    }

    // Form validation for signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSignupForm()) {
                // Simulate signup process
                simulateSignup();
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert(`This would authenticate with ${this.textContent.trim()} in a real application.`);
        });
    });
});

function checkPasswordStrength(password) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Reset
    strengthBars.forEach(bar => bar.style.backgroundColor = '#ddd');
    
    let strength = 0;
    let messages = [];
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Cap at 4 for our 4-bar display
    strength = Math.min(strength, 5);
    
    // Update UI
    for (let i = 0; i < strength; i++) {
        let color;
        if (strength <= 1) color = '#e74c3c'; // Weak
        else if (strength <= 3) color = '#f39c12'; // Medium
        else if (strength <= 4) color = '#2ecc71'; // Strong
        
        strengthBars[i].style.backgroundColor = color;
    }
    
    // Update text
    if (password.length === 0) {
        strengthText.textContent = '';
    } else if (strength <= 1) {
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 3) {
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#f39c12';
    } else if (strength <= 4) {
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#2ecc71';
    }
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    // Email validation
    if (!email.value) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    return isValid;
}

function validateSignupForm() {
    const username = document.getElementById('signupUsername');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsAgree = document.getElementById('termsAgree');
    
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    let isValid = true;
    
    // Username validation
    if (!username.value) {
        usernameError.textContent = 'Username is required';
        usernameError.style.display = 'block';
        isValid = false;
    } else if (username.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }
    
    // Email validation
    if (!email.value) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    // Confirm password validation
    if (!confirmPassword.value) {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }
    
    // Terms agreement validation
    if (!termsAgree.checked) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

function simulateLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // In a real app, you would send this to your backend
    console.log('Login attempt with:', { email, password });
    
    // Simulate API call
    setTimeout(() => {
        alert('Login successful! Redirecting to dashboard...');
        // In a real app, you would redirect or update the UI
        window.location.href = 'body.html';
    }, 1000);
}

function simulateSignup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // In a real app, you would send this to your backend
    console.log('Signup attempt with:', { username, email, password });
    
    // Simulate API call
    setTimeout(() => {
        alert('Account created successfully! Redirecting to login...');
        // In a real app, you might log them in directly or redirect to login
        window.location.href = 'login.html';
    }, 1000);
}