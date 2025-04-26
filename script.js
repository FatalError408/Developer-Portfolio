
// Particle Background
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

// Project Data
const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=E-Commerce+Project",
        tags: ["React", "Node.js", "MongoDB", "Frontend", "Backend"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "fullstack"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A Kanban-style task management application with drag-and-drop functionality.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Task+Management",
        tags: ["React", "Firebase", "Frontend"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "frontend"
    },
    // Add more projects as needed
];

// Experience Data
const EXPERIENCE = [
    {
        company: "Tech Innovations Inc.",
        role: "Senior Software Engineer",
        period: "2021 - Present",
        achievements: [
            "Led development of microservices architecture",
            "Mentored junior developers",
            "Implemented CI/CD pipelines"
        ]
    },
    // Add more experience items as needed
];

// Initialize Particles
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-bg');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);

    const particles = Array.from({ length: 50 }, () => new Particle(canvas));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Scroll Reveal
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
            element.classList.add('active');
        }
    });
}

// Mobile Menu
function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    
    menuButton?.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Progress Bars Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Project Filtering
function setupProjectFilters() {
    const filters = document.querySelectorAll('.project-filters button');
    const projectsGrid = document.querySelector('.projects-grid');

    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank">GitHub</a>
                    <a href="${project.liveUrl}" target="_blank">Live Demo</a>
                </div>
            </div>
        `;
    }

    // Initial project load
    projectsGrid.innerHTML = PROJECTS.map(createProjectCard).join('');

    // Filter functionality
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const filteredProjects = category === 'all' 
                ? PROJECTS 
                : PROJECTS.filter(p => p.category === category);
            
            projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
        });
    });
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent successfully!');
        form.reset();
    });
}

// Toast Notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Navigation Scroll Effect
function setupNavScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(20, 21, 23, 0.9)';
        } else {
            navbar.style.background = 'rgba(20, 21, 23, 0.8)';
        }
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupMobileMenu();
    setupProjectFilters();
    setupContactForm();
    setupNavScroll();
    
    // Initial scroll reveal
    scrollReveal();
    window.addEventListener('scroll', scrollReveal);
    
    // Animate progress bars when skills section is in view
    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateProgressBars();
            observer.unobserve(skillsSection);
        }
    });
    observer.observe(skillsSection);
});
