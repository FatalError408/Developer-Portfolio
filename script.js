
// Initialize Lucide icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('glass');
    } else {
        navbar.classList.remove('glass');
    }
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    icon.setAttribute('data-lucide', 
        icon.getAttribute('data-lucide') === 'menu' ? 'x' : 'menu'
    );
    lucide.createIcons();
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Particle background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = Math.random() > 0.5 ? '#3B82F6' : '#EAB308';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle background
const initParticles = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-bg');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);

    const particles = Array.from({ length: 50 }, () => new Particle(canvas));

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        requestAnimationFrame(animate);
    };

    animate();
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
