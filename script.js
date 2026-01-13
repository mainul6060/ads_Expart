// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Scroll to form when Order Now button is clicked
    const orderNowBtn = document.getElementById('order-now-btn');
    const formSection = document.getElementById('form-section');
    
    orderNowBtn.addEventListener('click', function() {
        formSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add a subtle animation to the form
        setTimeout(() => {
            const formContainer = document.querySelector('.form-container');
            formContainer.style.transform = 'scale(1.02)';
            formContainer.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                formContainer.style.transform = 'scale(1)';
            }, 300);
        }, 500);
    });
    
    // Form validation and submission
    const orderForm = document.getElementById('order-form');
    const thankYouMessage = document.getElementById('thank-you');
    const newOrderBtn = document.getElementById('new-order-btn');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state on submit button
            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission with FormSubmit.co
            setTimeout(() => {
                // In a real implementation, this would be the actual form submission
                // For this demo, we'll show the thank you message
                
                // Hide the form and show thank you message
                orderForm.style.display = 'none';
                thankYouMessage.style.display = 'block';
                
                // Reset submit button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to thank you message
                thankYouMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form
                orderForm.reset();
                
                // Reset floating labels
                resetFloatingLabels();
            }, 1500);
        }
    });
    
    // New order button
    newOrderBtn.addEventListener('click', function() {
        // Hide thank you message and show form again
        thankYouMessage.style.display = 'none';
        orderForm.style.display = 'block';
        
        // Scroll to form
        formSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Get form elements
        const fullName = document.getElementById('fullname');
        const whatsapp = document.getElementById('whatsapp');
        const email = document.getElementById('email');
        const service = document.getElementById('service');
        const businessInfo = document.getElementById('business-info');
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Validate Full Name
        if (!fullName.value.trim()) {
            showError(fullName, 'Full name is required');
            isValid = false;
        }
        
        // Validate WhatsApp
        if (!whatsapp.value.trim()) {
            showError(whatsapp, 'WhatsApp number is required');
            isValid = false;
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(whatsapp.value.replace(/\D/g, ''))) {
            showError(whatsapp, 'Please enter a valid WhatsApp number');
            isValid = false;
        }
        
        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Email address is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Service
        if (!service.value) {
            showError(service, 'Please select a service');
            isValid = false;
        }
        
        // Validate Business Info
        if (!businessInfo.value.trim()) {
            showError(businessInfo, 'Business information is required');
            isValid = false;
        } else if (businessInfo.value.trim().length < 20) {
            showError(businessInfo, 'Please provide more details (at least 20 characters)');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(inputElement, message) {
        const errorElement = inputElement.closest('.form-group').querySelector('.error-message');
        errorElement.textContent = message;
        
        // Add error styling to input
        inputElement.style.borderColor = '#e74c3c';
        inputElement.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.1)';
        
        // Focus on the first invalid field
        if (!document.querySelector('.input-error')) {
            inputElement.classList.add('input-error');
            inputElement.focus();
            
            // Remove error class after focus is lost
            inputElement.addEventListener('blur', function() {
                this.classList.remove('input-error');
            }, { once: true });
        }
    }
    
    // Reset floating labels when form is reset
    function resetFloatingLabels() {
        document.querySelectorAll('.input-container input, .input-container select, .input-container textarea').forEach(input => {
            const label = input.nextElementSibling;
            
            if (input.value === '') {
                label.style.top = '50%';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--gray-color)';
                
                if (input.tagName === 'TEXTAREA') {
                    label.style.top = '25px';
                    label.style.transform = 'none';
                } else {
                    label.style.transform = 'translateY(-50%)';
                }
            }
        });
    }
    
    // Add input event listeners to reset error styling
    document.querySelectorAll('.input-container input, .input-container select, .input-container textarea').forEach(input => {
        input.addEventListener('input', function() {
            // Remove error styling
            this.style.borderColor = '';
            this.style.boxShadow = '';
            
            // Clear error message
            const errorElement = this.closest('.form-group').querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial animation check
    animateOnScroll();
    
    // Check animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hover-active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Floating label functionality for select elements
    const selectElements = document.querySelectorAll('.input-container select');
    
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            const label = this.nextElementSibling;
            
            if (this.value !== '') {
                label.style.top = '10px';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--primary-color)';
                label.style.transform = 'none';
            } else {
                label.style.top = '50%';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--gray-color)';
                label.style.transform = 'translateY(-50%)';
            }
        });
    });
});