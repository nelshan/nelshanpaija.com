document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const navbarMenu = document.querySelector(".navbar__menu");
    
    mobileMenu.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
        navbarMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a menu item (but not dropdown toggles)
    document.querySelectorAll(".navbar__links").forEach(n => {
        // Check if this is a dropdown toggle
        const isDropdownToggle = n.closest('.dropdown') && n.querySelector('i.fas.fa-chevron-down');
        
        n.addEventListener("click", () => {
            // Only close mobile menu if it's NOT a dropdown toggle
            if (!isDropdownToggle) {
                mobileMenu.classList.remove("active");
                navbarMenu.classList.remove("active");
            }
        });
    });

    // Dropdown toggle functionality
    const dropdownToggles = document.querySelectorAll(".dropdown .navbar__links");
    const dropdownContents = document.querySelectorAll(".dropdown-content");
    
    dropdownToggles.forEach((dropdownToggle, index) => {
        const dropdownContent = dropdownContents[index];
        const dropdownContainer = dropdownToggle.closest('.dropdown');
        if (dropdownToggle && dropdownContent && dropdownContainer) {
            dropdownToggle.addEventListener("click", function(e) {
                e.preventDefault();
                dropdownContent.classList.toggle("show");
                dropdownContainer.classList.toggle("active");
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function(e) {
        dropdownContents.forEach((dropdownContent, index) => {
            if (!dropdownContent.contains(e.target) && !e.target.closest('.dropdown .navbar__links')) {
                dropdownContent.classList.remove("show");
                const dropdownContainer = dropdownContent.closest('.dropdown');
                if (dropdownContainer) {
                    dropdownContainer.classList.remove("active");
                }
            }
        });
    });
    
    // Close mobile menu when clicking on dropdown links (Games, UI/UX)
    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            navbarMenu.classList.remove("active");
            
            // Also close the dropdown
            const dropdownContent = link.closest('.dropdown-content');
            const dropdownContainer = link.closest('.dropdown');
            if (dropdownContent) {
                dropdownContent.classList.remove("show");
            }
            if (dropdownContainer) {
                dropdownContainer.classList.remove("active");
            }
        });
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Show button when scrolled down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Scroll back to top smoothly
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Contact form validation and enhancement
    const contactForm = document.querySelector('form[action*="mailto:"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return false;
            }
            
            // Create mailto link with form data
            const mailtoLink = `mailto:nelshanpaijapun@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
        });
    }
});

// Animation on Scroll functionality
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project, .contact__item, .badge, .project-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Enhanced dropdown animation
function enhanceDropdownAnimation() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownToggle = dropdown.querySelector('.navbar__links');
        
        if (dropdownToggle && dropdownContent) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdownContent.classList.toggle('show');
                dropdown.classList.toggle('active');
                
                // Add animation class
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.style.animation = 'scaleIn 0.3s ease-out forwards';
                }
            });
        }
    });
}

// Enhanced form animations
function enhanceFormAnimations() {
    const formInputs = document.querySelectorAll('.form__group input, .form__group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.style.transform = 'translateY(0)';
            }
        });
    });
}

// Enhanced project card animations
function enhanceProjectAnimations() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            const img = project.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        project.addEventListener('mouseleave', () => {
            const img = project.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// Smooth scroll with animation
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 80; // Account for navbar height
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced scroll to top button
function enhanceScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
                scrollBtn.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            smoothScrollTo(document.body);
        });
    }
}

// Parallax effect for intro section
function addParallaxEffect() {
    const intro = document.querySelector('.intro');
    
    if (intro) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            intro.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Enhanced loading animations
function addLoadingAnimations() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.animation = 'fadeInUp 0.6s ease-out';
        });
    });
    
    // Add staggered animation to project grid
    const projectGrid = document.querySelector('.projects__container');
    if (projectGrid) {
        projectGrid.classList.add('stagger-animation');
    }
}

// Enhanced contact form validation with animations
function enhanceContactForm() {
    const contactForm = document.querySelector('form[action*="mailto:"]');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                input.style.animation = 'shake 0.5s ease-in-out';
                input.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    input.style.animation = '';
                    input.style.borderColor = '';
                }, 500);
            });
            
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.style.borderColor = '#4CAF50';
                    input.style.animation = 'pulse 0.3s ease-out';
                }
            });
        });
    }
}

// Add shake animation for form validation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    const mobileMenu = document.querySelector('#mobile-menu');
    const navbarMenu = document.querySelector('.navbar__menu');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a menu item (but not dropdown toggles)
    document.querySelectorAll(".navbar__links").forEach(n => {
        // Check if this is a dropdown toggle
        const isDropdownToggle = n.closest('.dropdown') && n.querySelector('i.fas.fa-chevron-down');
        
        n.addEventListener("click", () => {
            // Only close mobile menu if it's NOT a dropdown toggle
            if (!isDropdownToggle) {
                mobileMenu.classList.remove("active");
                navbarMenu.classList.remove("active");
            }
        });
    });

    // Close mobile menu when clicking on dropdown links (Games, UI/UX)
    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            navbarMenu.classList.remove("active");
            
            // Also close the dropdown
            const dropdownContent = link.closest('.dropdown-content');
            const dropdownContainer = link.closest('.dropdown');
            if (dropdownContent) {
                dropdownContent.classList.remove("show");
            }
            if (dropdownContainer) {
                dropdownContainer.classList.remove("active");
            }
        });
    });

    // Dropdown functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownToggle = dropdown.querySelector('.navbar__links');
        
        if (dropdownToggle && dropdownContent) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdownContent.classList.toggle('show');
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Scroll to top functionality
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form validation and enhancement
    const contactForm = document.querySelector('form[action*="mailto:"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return false;
            }
            
            // Create mailto link with form data
            const mailtoLink = `mailto:nelshanpaijapun@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
        });
    }

    // Initialize new animation features
    animateOnScroll();
    enhanceDropdownAnimation();
    enhanceFormAnimations();
    enhanceProjectAnimations();
    enhanceScrollToTop();
    addParallaxEffect();
    addLoadingAnimations();
    enhanceContactForm();
});
