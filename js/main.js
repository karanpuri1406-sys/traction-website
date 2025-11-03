// ===================================
// Traction - Main JavaScript
// AI-Powered SEO & Lead Generation
// ===================================

(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');

    // ===== NAVBAR SCROLL EFFECT =====
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ===== MOBILE MENU TOGGLE =====
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== TABS FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .use-case-item, .process-step, .result-card, .testimonial-card, .blog-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));

    // ===== CONTACT FORM HANDLING =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                showNotification('Thank you! We\'ll be in touch within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Log form data (in production, send to server)
                console.log('Form submitted:', formData);
            }, 1500);
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ===== DYNAMIC STATS COUNTER =====
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const value = parseInt(text.replace(/\D/g, ''));
                    if (value && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, value);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ===== FORM VALIDATION =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Real-time email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#f87171';
                showNotification('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '';
            }
        });

        emailInput.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== PRICING CARD HOVER EFFECTS =====
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.6';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // ===== GRADIENT ORBS PARALLAX EFFECT =====
    const orbs = document.querySelectorAll('.gradient-orb');
    if (orbs.length > 0 && window.innerWidth > 768) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ===== COPY EMAIL TO CLIPBOARD =====
    const emailElements = document.querySelectorAll('.contact-item p');
    emailElements.forEach(el => {
        if (el.textContent.includes('@')) {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy';
            
            el.addEventListener('click', function() {
                const email = this.textContent.trim();
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!', 'success');
                });
            });
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll handler
    const debouncedScroll = debounce(handleNavbarScroll, 10);
    window.removeEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', debouncedScroll);

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ===== INITIALIZE ON PAGE LOAD =====
    window.addEventListener('load', function() {
        // Remove loading class if exists
        document.body.classList.remove('loading');

        // Trigger initial animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('loaded');
        }

        console.log('Traction website loaded successfully! 🚀');
    });

    // ===== SERVICE WORKER REGISTRATION (Optional for PWA) =====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js').then(registration => {
            //     console.log('SW registered:', registration);
            // }).catch(error => {
            //     console.log('SW registration failed:', error);
            // });
        });
    }

})();

// ===== NOTIFICATION STYLES (Injected dynamically) =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 20px 25px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        max-width: 400px;
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        color: white;
        font-weight: 500;
    }

    .notification-success {
        border-left: 4px solid #10b981;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
    }

    .notification-info {
        border-left: 4px solid #3b82f6;
    }

    .notification-content i {
        font-size: 1.3rem;
    }

    .notification-success .notification-content i {
        color: #10b981;
    }

    .notification-error .notification-content i {
        color: #ef4444;
    }

    .notification-info .notification-content i {
        color: #3b82f6;
    }

    .notification-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 5px;
        transition: color 0.2s;
    }

    .notification-close:hover {
        color: white;
    }

    @media (max-width: 480px) {
        .notification {
            left: 15px;
            right: 15px;
            max-width: none;
        }
    }

    /* Keyboard navigation styles */
    body.keyboard-nav *:focus {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(notificationStyles);