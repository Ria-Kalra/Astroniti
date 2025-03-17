document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');
    const myProfile = document.getElementById('my-profile');
    const formContainer = document.getElementById('form-container');
    const authForm = document.getElementById('authForm');
    const toggleForm = document.getElementById('toggle-form');
    const formTitle = document.getElementById('form-title');
    const submitButton = authForm.querySelector('input[type="submit"]');
  
    let isSignUp = false;
  
    // Show login/sign-up dialog
    loginBtn.addEventListener('click', function () {
      formContainer.style.display = 'flex';
    });
  
    // Close the form if clicked outside
    window.addEventListener('click', function (event) {
      if (event.target === formContainer) {
        formContainer.style.display = 'none';
      }
    });
  
    // Toggle between login and sign-up
    toggleForm.addEventListener('click', function () {
      isSignUp = !isSignUp;
      formTitle.textContent = isSignUp ? 'Sign Up' : 'Log In';
      submitButton.value = isSignUp ? 'Sign Up' : 'Log In';
      toggleForm.textContent = isSignUp ? 'Switch to Log In' : 'Switch to Sign Up';
    });
  
    // Handle form submission
    authForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Basic validation
      if (username === '' || password === '') {
        alert('Please fill out both fields!');
        return;
      }
  
      if (isSignUp) {
        // Simulate sign-up success
        alert('Account created successfully! You can now log in.');
        isSignUp = false;
        formTitle.textContent = 'Log In';
        submitButton.value = 'Log In';
        toggleForm.textContent = 'Switch to Sign Up';
      } else {
        // Simulate successful login
        alert('Logged in successfully!');
        formContainer.style.display = 'none';
  
        // Change "Login" button to "My Profile"
        loginBtn.style.display = 'none';
        myProfile.style.display = 'inline';
      }
    });
  
    // Redirect to profile page
    myProfile.addEventListener('click', function () {
      window.location.href = '/profile.html';
    });
  });
  

document.getElementById('enquire-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default behavior
    document.getElementById('footer').scrollIntoView({
        behavior: 'smooth' // Smooth scroll effect
    });
});
