/**
 * Modern Contact Form Functionality
 * Handles form validation, progressive disclosure, and user interactions
 */

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.formWrapper = document.getElementById('contact-form-wrapper');
    this.toggleBtn = document.getElementById('contact-toggle-btn');
    this.submitBtn = document.getElementById('submit-btn');
    this.btnSpinner = document.getElementById('btn-spinner');
    this.formStatus = document.getElementById('form-status');

    this.isFormVisible = false;
    this.isSubmitting = false;

    this.init();
  }

  init() {
    if (!this.form || !this.toggleBtn) return;

    // Bind event listeners
    this.toggleBtn.addEventListener('click', this.toggleForm.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Real-time validation
    this.setupRealTimeValidation();

    // Keyboard navigation
    this.setupKeyboardNavigation();

    // Accessibility
    this.setupAccessibility();
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;

    // Update button state
    this.toggleBtn.classList.toggle('active', this.isFormVisible);
    this.formWrapper.classList.toggle('active', this.isFormVisible);

    // Update ARIA attributes
    this.toggleBtn.setAttribute('aria-expanded', this.isFormVisible);

    // Focus management
    if (this.isFormVisible) {
      setTimeout(() => {
        const firstInput = this.form.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 300); // Wait for animation
    }

    // Analytics tracking (if needed)
    this.trackInteraction('form_toggle', { action: this.isFormVisible ? 'open' : 'close' });
  }

  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (!errorElement) return;

    let errorMessage = '';
    const value = field.value.trim();

    switch (field.name) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;

      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
    }

    if (errorMessage) {
      errorElement.textContent = errorMessage;
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('error');
    } else {
      errorElement.textContent = '';
      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('error');
    }

    return !errorMessage;
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement && field.value.trim()) {
      errorElement.textContent = '';
      field.classList.remove('error');
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.isSubmitting) return;

    // Validate all fields
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showStatus('Please correct the errors above', 'error');
      return;
    }

    // Start submission
    this.setSubmitting(true);
    this.showStatus('', '');

    try {
      // Simulate API call (replace with actual endpoint)
      await this.submitForm(new FormData(this.form));

      // Success
      this.showStatus('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
      this.form.reset();
      this.clearAllErrors();

      // Track success
      this.trackInteraction('form_submit', { status: 'success' });

    } catch (error) {
      // Error
      this.showStatus('Failed to send message. Please try again or contact me directly.', 'error');

      // Track error
      this.trackInteraction('form_submit', { status: 'error', error: error.message });
    } finally {
      this.setSubmitting(false);
    }
  }

  async submitForm(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, we'll simulate a successful submission
    // In production, replace with actual API call:
    /*
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    return response.json();
    */

    // Simulate random failure for demo (remove in production)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
  }

  setSubmitting(isSubmitting) {
    this.isSubmitting = isSubmitting;
    this.submitBtn.classList.toggle('loading', isSubmitting);
    this.submitBtn.disabled = isSubmitting;

    // Update ARIA attributes
    this.submitBtn.setAttribute('aria-disabled', isSubmitting);
  }

  showStatus(message, type) {
    this.formStatus.textContent = message;
    this.formStatus.className = `form-status ${type}`;

    // Announce to screen readers
    this.formStatus.setAttribute('aria-live', 'polite');
  }

  clearAllErrors() {
    const errorElements = this.form.querySelectorAll('.form-error');
    const inputs = this.form.querySelectorAll('input, textarea');

    errorElements.forEach(el => el.textContent = '');
    inputs.forEach(input => {
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');
    });
  }

  setupKeyboardNavigation() {
    // ESC key to close form
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isFormVisible) {
        this.toggleForm();
      }
    });

    // Enter key on toggle button
    this.toggleBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleForm();
      }
    });
  }

  setupAccessibility() {
    // Set initial ARIA attributes
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.setAttribute('aria-controls', 'contact-form-wrapper');
    this.formWrapper.setAttribute('aria-hidden', 'true');

    // Update when form visibility changes
    const observer = new MutationObserver(() => {
      const isVisible = this.formWrapper.classList.contains('active');
      this.formWrapper.setAttribute('aria-hidden', (!isVisible).toString());
    });

    observer.observe(this.formWrapper, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Form field labels and descriptions
    const fields = this.form.querySelectorAll('input, textarea');
    fields.forEach(field => {
      const errorId = `${field.name}-error`;
      field.setAttribute('aria-describedby', errorId);
    });
  }

  trackInteraction(event, data) {
    // Analytics tracking - replace with your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', event, {
        event_category: 'contact_form',
        ...data
      });
    }

    // Console logging for development
    console.log('Contact form interaction:', event, data);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});

// Smooth scroll for contact links
document.addEventListener('DOMContentLoaded', () => {
  const contactLinks = document.querySelectorAll('a[href="#contact"]');

  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Focus the toggle button after scrolling
        setTimeout(() => {
          const toggleBtn = document.getElementById('contact-toggle-btn');
          if (toggleBtn) toggleBtn.focus();
        }, 800);
      }
    });
  });
});