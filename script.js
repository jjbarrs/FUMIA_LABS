// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
});

// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Remove any existing theme class first
    html.classList.remove('light-mode', 'dark-mode');
    
    // Add the correct theme class
    html.classList.add(currentTheme === 'dark' ? 'dark-mode' : 'light-mode');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('light-mode')) {
                html.classList.remove('light-mode');
                html.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                html.classList.remove('dark-mode');
                html.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Language Toggle Functionality
function initializeLanguage() {
    const langToggle = document.getElementById('langToggle');
    
    if (!langToggle) return;
    
    const toggleOptions = langToggle.querySelectorAll('.toggle-option');
    
    // Check for saved language preference or default to Spanish
    let currentLang = localStorage.getItem('language') || 'es';
    
    // Set initial active state
    toggleOptions.forEach(option => {
        if (option.dataset.lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Apply initial language
    updateLanguage(currentLang);
    
    // Add click event to toggle options
    toggleOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.dataset.lang;
            
            // Update active state
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update language
            currentLang = selectedLang;
            localStorage.setItem('language', selectedLang);
            updateLanguage(selectedLang);
        });
    });
}

function updateLanguage(lang) {
    // Update all elements with data attributes for both languages
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    elements.forEach(element => {
        if (lang === 'es') {
            element.textContent = element.dataset.es;
        } else {
            element.textContent = element.dataset.en;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});