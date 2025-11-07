document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;
  const feedback = document.getElementById('formFeedback');
  const today = new Date().toISOString().split('T')[0];
  feedback.textContent = '';

  // Clear all old errors
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  // Name validation
  const name = this.name.value.trim();
  if (name.length < 3) {
    setError('name', 'Name must be at least 3 characters.');
    isValid = false;
  }

  // Email validation
  const email = this.email.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    setError('email', 'Enter a valid email address.');
    isValid = false;
  }

  // Phone validation
  const phone = this.phone.value.trim();
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    setError('phone', 'Enter a valid 10-digit phone number.');
    isValid = false;
  }

  // Shoot type validation
  if (this.shootType.value === '') {
    setError('shootType', 'Please select a shoot type.');
    isValid = false;
  }

  // Date validation
  const date = this.date.value;
  if (!date || date < today) {
    setError('date', 'Select a valid future date.');
    isValid = false;
  }

  // Location validation
  if (this.location.value.trim().length < 3) {
    setError('location', 'Location is required.');
    isValid = false;
  }

  // Terms checkbox
  if (!this.terms.checked) {
    setError('terms', 'You must agree before submitting.');
    isValid = false;
  }

  // If valid -> success message
  if (isValid) {
    feedback.style.color = 'green';
    feedback.textContent = '✅ Thank you! Your registration has been received.';
    console.log({
      name, email, phone,
      shootType: this.shootType.value,
      date, time: this.time.value,
      location: this.location.value.trim(),
      message: this.message.value.trim()
    });
    this.reset();
  } else {
    feedback.style.color = 'red';
    feedback.textContent = '⚠️ Please correct the errors and try again.';
  }

  // Helper to show error message
  function setError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    const errorEl = inputField.closest('.form-group, .form-check').querySelector('.error');
    if (errorEl) errorEl.textContent = message;
  }
});