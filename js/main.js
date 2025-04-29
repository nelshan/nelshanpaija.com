document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const navbarMenu = document.querySelector(".navbar__menu");
    
    mobileMenu.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
        navbarMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a menu item
    document.querySelectorAll(".navbar__links").forEach(n => n.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navbarMenu.classList.remove("active");
    }));

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
});
