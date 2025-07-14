document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#signupForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const usernameInput = form.username;
  const emailInput = form.email;
  const phoneInput = form.phone;
  const passwordInput = form.password;
  const confirmPasswordInput = form.confirmPassword;
  const genderSelect = form.gender;
  const passwordToggles = document.querySelectorAll('.password-toggle');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[0-9]).{6,}$/;

  const touched = {
    username: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    gender: false
  };

  [
    { input: usernameInput, name: 'username' },
    { input: emailInput, name: 'email' },
    { input: phoneInput, name: 'phone' },
    { input: passwordInput, name: 'password' },
    { input: confirmPasswordInput, name: 'confirmPassword' },
    { input: genderSelect, name: 'gender' }
  ].forEach(({input, name}) => {
    input.addEventListener('blur', () => {
      touched[name] = true;
      validateField(input, name);
      runValidation();
    });
    input.addEventListener('input', () => {
      if (touched[name]) {
        validateField(input, name);
      }
      runValidation();
    });
  });

  function validateField(input, name) {
    let error;
    if (input.parentElement.classList.contains('input-group')) {
      error = input.parentElement.parentElement.querySelector('.error-message');
    } else {
      error = input.parentElement.querySelector('.error-message');
    }
    if (!error && input.tagName === 'SELECT') {
      error = input.nextElementSibling;
    }

    let isValid = true;
    let message = "";

    switch(name) {
      case 'username':
        isValid = input.value.trim() !== '';
        message = "Username is required";
        break;
      case 'email':
        isValid = emailRegex.test(input.value);
        message = "Invalid email format";
        break;
      case 'phone':
        isValid = phoneRegex.test(input.value);
        message = "Phone must be 10 digits";
        break;
      case 'password':
        isValid = passwordRegex.test(input.value);
        message = "Password ≥6 chars incl. number";
        break;
      case 'confirmPassword':
        isValid = input.value === passwordInput.value && passwordRegex.test(input.value);
        message = "Passwords do not match";
        break;
      case 'gender':
        isValid = input.value !== '';
        message = "Please select a gender";
        break;
    }

    if (!isValid) {
      error.textContent = message;
    } else {
      error.textContent = "";
    }
  }

  function runValidation() {
    const fieldsValid =
      usernameInput.value.trim() !== '' &&
      emailRegex.test(emailInput.value) &&
      phoneRegex.test(phoneInput.value) &&
      passwordRegex.test(passwordInput.value) &&
      confirmPasswordInput.value === passwordInput.value && passwordRegex.test(confirmPasswordInput.value) &&
      genderSelect.value !== '';

    if (fieldsValid) {
      enableButton();
    } else {
      disableButton();
    }
  }

  function disableButton() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled-btn');
  }

  function enableButton() {
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled-btn');
  }

  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const icon = toggle.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    disableButton();

    const formData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      gender: genderSelect.value,
      phone: phoneInput.value.trim()
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = `/success?username=${encodeURIComponent(formData.username)}&email=${encodeURIComponent(formData.email)}&gender=${encodeURIComponent(formData.gender)}&phone=${encodeURIComponent(formData.phone)}`;
      } else {
        alert('Failed to sign up. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred. Please try again.');
    } finally {
      enableButton();
    }
  });

});