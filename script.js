
// Particle Background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = Math.random() > 0.5 ? '#3B82F6' : '#EAB308';
        this.alpha = Math.random() * 0.5 + 0.1;
        this.connectedParticles = [];
    }

    update(particles) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Handle edge cases
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;

        // Find nearby particles to connect with
        this.connectedParticles = [];
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            if (particle === this) continue;

            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.connectedParticles.push({
                    particle,
                    distance
                });
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections to nearby particles
        for (const connection of this.connectedParticles) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = 0.1 * (1 - connection.distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(connection.particle.x, connection.particle.y);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
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
    {
        id: 2,
        title: "Portfolio Website",
        description: "Modern, responsive portfolio website built with React and TailwindCSS.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Portfolio+Project",
        tags: ["React", "TailwindCSS", "Framer Motion"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "frontend"
    },
    {
        id: 3,
        title: "Task Management API",
        description: "RESTful API for task management with authentication and permission system.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Task+API+Project",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "backend"
    },
    {
        id: 4,
        title: "Real-time Chat Application",
        description: "Chat application with real-time messaging, user presence, and file sharing capabilities.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Chat+App+Project",
        tags: ["React", "Socket.io", "Express", "MongoDB"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "fullstack"
    },
    {
        id: 5,
        title: "Weather Dashboard",
        description: "Interactive weather dashboard with data visualization and location-based forecasts.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Weather+Dashboard",
        tags: ["JavaScript", "Chart.js", "Weather API"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "frontend"
    },
    {
        id: 6,
        title: "Content Management System",
        description: "Headless CMS for managing website content with a user-friendly interface.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=CMS+Project",
        tags: ["Node.js", "Express", "PostgreSQL", "GraphQL"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "backend"
    }
];

// Experience Data
const EXPERIENCE = [
    {
        company: "Tech Innovations Inc.",
        role: "Senior Software Engineer",
        period: "2021 - Present",
        location: "San Francisco, CA",
        achievements: [
            "Led development of microservices architecture that improved system scalability by 40%",
            "Mentored junior developers and conducted code reviews to maintain high code quality",
            "Implemented CI/CD pipelines that reduced deployment time by 60%",
            "Optimized database queries resulting in a 30% performance improvement"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"]
    },
    {
        company: "DataSphere Solutions",
        role: "Full Stack Developer",
        period: "2018 - 2021",
        location: "Boston, MA",
        achievements: [
            "Developed and maintained multiple client-facing web applications",
            "Designed and implemented RESTful APIs consumed by web and mobile applications",
            "Collaborated with UX/UI team to implement responsive designs",
            "Migrated legacy systems to modern tech stacks, improving performance and user experience"
        ],
        technologies: ["JavaScript", "Vue.js", "Express", "MongoDB", "AWS"]
    },
    {
        company: "WebCraft Agency",
        role: "Frontend Developer",
        period: "2016 - 2018",
        location: "Seattle, WA",
        achievements: [
            "Built interactive UI components for various client websites",
            "Implemented responsive designs following best practices",
            "Worked with backend team to integrate frontend with APIs",
            "Optimized website performance and loading times"
        ],
        technologies: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap", "Sass"]
    }
];

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Initialize Typed.js
    new Typed('.typing', {
        strings: [
            'build web applications',
            'solve complex problems',
            'create user experiences',
            'love what I do'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 1000,
        loop: true
    });

    // Initialize Particles with connections
    initializeParticles();
    
    // Initialize VanillaTilt
    initializeVanillaTilt();

    // Custom Cursor
    initializeCustomCursor();

    // Scroll Reveal
    initializeScrollReveal();

    // Skill Bars Animation
    initializeSkillBars();

    // Project Filtering
    initializeProjects();
    
    // Experience Timeline
    initializeExperience();

    // Contact Form
    initializeContactForm();

    // Theme Toggle
    initializeThemeToggle();

    // Mobile Menu
    initializeMobileMenu();

    // Smooth Scrolling
    initializeSmoothScrolling();
    
    // GSAP Animations
    initializeGSAPAnimations();
});

// Initialize Particles
function initializeParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-bg');
    
    if (!particlesContainer) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);

    const particles = Array.from({ length: 50 }, () => new Particle(canvas));

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', handleResize);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update(particles);
            particle.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize VanillaTilt
function initializeVanillaTilt() {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    if (tiltElements.length === 0) return;

    VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });
}

// Initialize Custom Cursor
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Add effects when hovering over links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, [data-tilt]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--primary-light)';
            cursor.style.borderWidth = '1px';
            cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'var(--primary)';
            cursor.style.borderWidth = '2px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1;
    });
}

// Initialize Scroll Reveal
function initializeScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Initialize Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.querySelector('.progress').style.width = `${progress}%`;
                
                // Add counter animation for percentage display
                const percentageDisplay = entry.target.parentNode.querySelector('.percentage');
                if (percentageDisplay) {
                    let count = 0;
                    const target = parseInt(progress);
                    const interval = setInterval(() => {
                        if (count < target) {
                            count++;
                            percentageDisplay.textContent = `${count}%`;
                        } else {
                            clearInterval(interval);
                        }
                    }, 15);
                }
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Project Filtering and Creation
function initializeProjects() {
    const filters = document.querySelectorAll('.project-filters button');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;

    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>
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
            
            // Update active filter button
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // Filter projects
            const filteredProjects = category === 'all' 
                ? PROJECTS 
                : PROJECTS.filter(p => p.category === category);
            
            // Animate out current projects
            const currentProjects = projectsGrid.querySelectorAll('.project-card');
            gsap.to(currentProjects, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                onComplete: () => {
                    // Update projects
                    projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
                    
                    // Animate in new projects
                    gsap.from(projectsGrid.querySelectorAll('.project-card'), {
                        opacity: 0,
                        y: 20,
                        stagger: 0.1
                    });

                    // Re-initialize VanillaTilt for new cards
                    if (typeof VanillaTilt !== 'undefined') {
                        VanillaTilt.init(projectsGrid.querySelectorAll('.project-card'), {
                            max: 10,
                            speed: 400,
                            glare: true,
                            "max-glare": 0.3
                        });
                    }
                }
            });
        });
    });
}

// Initialize Experience Timeline
function initializeExperience() {
    const experienceTimeline = document.querySelector('.experience-timeline');
    if (!experienceTimeline) return;
    
    // Create timeline items
    const timelineHTML = EXPERIENCE.map((exp, index) => `
        <div class="timeline-item" data-index="${index}">
            <div class="timeline-content">
                <div class="timeline-date">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${exp.period}
                </div>
                <h3 class="timeline-position">${exp.role}</h3>
                <span class="timeline-company">${exp.company} • ${exp.location}</span>
                <ul class="timeline-description">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
                <div class="timeline-tags">
                    ${exp.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    experienceTimeline.innerHTML = timelineHTML;
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Display sending state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
        
        // Simulate sending (replace with actual AJAX call)
        setTimeout(() => {
            showToast('Message sent successfully!');
            form.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }, 1500);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        const isLightTheme = document.body.classList.contains('light-theme');
        themeToggle.querySelector('.theme-icon').textContent = isLightTheme ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    
    if (!menuButton || !nav) return;
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a nav link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Toast Notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'all';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
    }
}

// GSAP Animations
function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Hero animations
    gsap.from('.hero-text > *', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power3.out',
        duration: 0.8,
        delay: 0.5
    });
    
    gsap.from('.profile-image', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.7
    });
    
    gsap.from('.hero-badges .badge', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        delay: 1.2
    });
    
    // Navbar animation
    gsap.from('#navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
    
    // Enhance scroll reveal with GSAP if ScrollTrigger is available
    if (gsap.plugins && gsap.plugins.ScrollTrigger) {
        gsap.utils.toArray('.reveal').forEach((section) => {
            gsap.from(section.querySelectorAll('h2, .section-subtitle, .about-card, .skill-category, .project-card, .timeline-item'), {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                }
            });
        });
    }
    
    // Floating elements
    document.querySelectorAll('.floating').forEach((el, i) => {
        gsap.to(el, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.2
        });
    });
}
