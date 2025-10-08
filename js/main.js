document.addEventListener("DOMContentLoaded", function () {
    // New Hamburger Menu Functionality
    const hamburger = document.getElementById("hamburger");
    const navbarMenu = document.getElementById("navbar-menu");
    
    if (hamburger && navbarMenu) {
        // initialize ARIA state
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-controls", "navbar-menu");
        
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
        navbarMenu.classList.toggle("active");
            const isExpanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", String(isExpanded));
    });
    }

    // Close mobile menu when clicking on a menu item (but not dropdown toggles)
    document.querySelectorAll(".navbar__links").forEach(n => {
        // Check if this is a dropdown toggle
        const isDropdownToggle = n.closest('.dropdown') && n.querySelector('i.fas.fa-chevron-down');
        
        n.addEventListener("click", () => {
            // Only close mobile menu if it's NOT a dropdown toggle
            if (!isDropdownToggle) {
                hamburger.classList.remove("active");
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
            // initialize ARIA state
            dropdownToggle.setAttribute('aria-expanded', 'false');
            
            dropdownToggle.addEventListener("click", function(e) {
                e.preventDefault();
                dropdownContent.classList.toggle("show");
                dropdownContainer.classList.toggle("active");
                const expanded = dropdownContent.classList.contains('show');
                dropdownToggle.setAttribute('aria-expanded', String(expanded));
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
                const toggle = dropdownContainer ? dropdownContainer.querySelector('.navbar__links') : null;
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close mobile menu when clicking on dropdown links (Games, UI/UX)
    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
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

    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
            hamburger.classList.remove("active");
            navbarMenu.classList.remove("active");
        }
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
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:nelshanpaijapun@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
        });
    }
});
