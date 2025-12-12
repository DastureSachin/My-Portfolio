document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Theme Toggle Functionality (single button: light → dim → dark)
    const themeToggle = document.getElementById('themeToggle');

    const themes = ['light', 'dim', 'dark'];

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Set initial theme
    const initialTheme = themes.includes(savedTheme) ? savedTheme : 'light';
    setTheme(initialTheme, false);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || initialTheme;
            const currentIndex = themes.indexOf(current);
            const nextTheme = themes[(currentIndex + 1 + themes.length) % themes.length];
            setTheme(nextTheme, true);
        });
    }

    function setTheme(theme, saveToStorage = true) {
        // Apply theme via data-theme attribute (matches CSS)
        document.documentElement.setAttribute('data-theme', theme);

        // Also update body classes for compatibility with any body.*-theme styles
        document.body.classList.remove('light-theme', 'dark-theme', 'dim-theme');
        document.body.classList.add(theme + '-theme');

        if (saveToStorage) {
            localStorage.setItem('theme', theme);
        }

        // Update icon on button
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                let iconClass = 'fa-sun';
                if (theme === 'dim') iconClass = 'fa-adjust';
                else if (theme === 'dark') iconClass = 'fa-moon';
                icon.className = 'fas ' + iconClass;
            }
        }

        // Update theme color meta tag for mobile browsers
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor && themeColor) {
            metaThemeColor.setAttribute('content', themeColor.trim());
        }
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
        
        // Animate timeline items on scroll
        animateOnScroll();
    });
    
    // Animate timeline items on scroll
    function animateOnScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add hover effect to buttons with RGB glow
    const buttons = document.querySelectorAll('.btn, .social-link, .project-link, .theme-btn, .nav-links a');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Add animation to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add animation to profile image on hover
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            profileImage.style.setProperty('--mouse-x', `${x}px`);
            profileImage.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    
    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // Add smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

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
});

// Animate timeline items on scroll
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
            
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
                
        if (itemTop < windowHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Initial check for elements in viewport
animateOnScroll();

// Add hover effect to buttons with RGB glow
const buttons = document.querySelectorAll('.btn, .social-link, .project-link, .theme-btn, .nav-links a');
        
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
                
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});
        
// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}
        
// Add animation to project cards on hover
const projectCards = document.querySelectorAll('.project-card');
        
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
                
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
        
// Add animation to profile image on hover
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
                
        profileImage.style.setProperty('--mouse-x', `${x}px`);
        profileImage.style.setProperty('--mouse-y', `${y}px`);
    });
}
        
// Add animation to section titles
const sectionTitles = document.querySelectorAll('.section-title');
        
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
        
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
        
sectionTitles.forEach(title => {
    observer.observe(title);
});
        
// Add animation to project cards on scroll
const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || '0s'} forwards`;
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});
        
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = 'none';
    card.dataset.delay = `${index * 0.1}s`;
    projectObserver.observe(card);
});
        
// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.dataset.level;
            entry.target.style.setProperty('--skill-level', `${level}%`);
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});
        
skillBars.forEach(bar => {
    skillObserver.observe(bar);
});
