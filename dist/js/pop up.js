$(document).ready(function () {
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
});

// Toggle between Login and Register forms
$('.login-reg-panel input[type="radio"]').on('change', function () {
    if ($('#log-login-show').is(':checked')) {
        $('.register-info-box').fadeOut();
        $('.login-info-box').fadeIn();
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');
    } else if ($('#log-reg-show').is(':checked')) {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        $('.white-panel').removeClass('right-log');
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});

// Handle the registration process
$('#registerBtn').on('click', function () {
    const email = $('.register-show input[type="text"]').val();
    const username = $('#usernameInput').val();
    const password = $('.register-show input[type="password"]').eq(0).val();
    const confirmPassword = $('.register-show input[type="password"]').eq(1).val();
    const identity = $('#exampleSelect').val(); // Get the selected identity

    // Simple validation for empty fields
    if (!email || !username || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Create an object to store user data
    const userData = {
        email: email,
        username: username,
        password: password,
        identity: identity
    };

    // Send user data to backend using AJAX or Fetch
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from backend:', data);  // Added for debugging

        if (data.success) {
            alert('Registration successful!');
            // Redirect based on user identity
            if (identity === '1') {
                window.location.href = 'owner.html'; // Redirect to Owner page
            } else if (identity === '2') {
                window.location.href = 'investor.html'; // Redirect to Investor page
            } else if (identity === '3') {
                window.location.href = 'analyzer.html'; // Redirect to Analyzer page
            }else if (identity === '4') {
                window.location.href = 'index2.html'; // Redirect to Analyzer page
            }
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    });
});

// Handle the login process
$('.login-show .btn').on('click', function () {
    const username = $('.login-show input[type="text"]').val();
    const password = $('.login-show input[type="password"]').val();

    // Simple validation for empty fields
    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Send login data to backend using AJAX or Fetch
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response from backend:', data);  // Added for debugging
        
        if (data.success) {
            // Redirect based on the user's identity
            if (data.identity === '1') {
                window.location.href = 'owner.html'; // Redirect to Owner page
            } else if (data.identity === '2') {
                window.location.href = 'investor.html'; // Redirect to Investor page
            } else if (data.identity === '3') {
                window.location.href = 'analyzer.html'; // Redirect to Analyzer page
            }
            else if (data.identity === '4') {
                window.location.href = 'index2.html'; // Redirect to Analyzer page
            }
        } else {
            alert('Invalid login credentials. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
});
