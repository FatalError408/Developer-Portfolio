
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
        tags: ["React", "Node.js", "MongoDB"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "fullstack"
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
    // Add more experience items
];

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typed.js
    new Typed('.typing', {
        strings: [
            'build web applications',
            'solve complex problems',
            'create user experiences',
            'love what I do'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Initialize Particles
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

    // Initialize VanillaTilt
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.querySelector('.progress').style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Project Filtering
    const filters = document.querySelectorAll('.project-filters button');
    const projectsGrid = document.querySelector('.projects-grid');

    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-content">
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
            </div>
        `;
    }

    // Initialize projects
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

    // Contact Form
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent successfully!');
        form.reset();
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.querySelector('.theme-icon').textContent = 
            document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    });

    // Mobile Menu
    const menuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    menuButton?.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Toast Notification
    window.showToast = function(message, duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

    // GSAP Animations
    gsap.from('.hero-text', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
