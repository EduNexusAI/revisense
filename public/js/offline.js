// Initialize particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth > 768 ? 15 : 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
        updateThemeToggleIcon('dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Reload page
function reloadPage() {
    const btn = document.getElementById('retryBtn');
    btn.disabled = true;
    const icon = btn.querySelector('.icon');
    icon.classList.add('active');

    // Simulate retry with delay
    setTimeout(() => {
        if (window.Capacitor && window.Capacitor.isNative) {
            window.Capacitor.Plugins.App.reload?.();
        } else {
            location.reload();
        }
    }, 1500);
}

// Go home
function goHome() {
    if (window.Capacitor && window.Capacitor.isNative) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Detect online status
window.addEventListener('online', () => {
    reloadPage();
});

// Initialize on load
window.addEventListener('load', () => {
    initializeParticles();
    loadTheme();
});

// Handle online detection
if (navigator.onLine === false && window.Capacitor && window.Capacitor.isNative) {
    // Running on native app and offline
}
