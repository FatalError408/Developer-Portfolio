
// Particle Background with enhanced visualization
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#9b87f5' : '#0fa0ce';
        this.alpha = Math.random() * 0.5 + 0.1;
        this.connectedParticles = [];
    }

    update(particles) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Handle edge cases with smooth wrapping
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
            
            if (distance < 120) {
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
            ctx.globalAlpha = 0.1 * (1 - connection.distance / 120);
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(connection.particle.x, connection.particle.y);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
}

// Project Data with enhanced descriptions and images
const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A scalable e-commerce platform with product management, user authentication, cart functionality, and Stripe payment integration.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=E-Commerce+Platform",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "fullstack"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A Kanban-style task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Task+Management",
        tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "frontend"
    },
    {
        id: 3,
        title: "API Gateway Service",
        description: "A microservice gateway that handles authentication, rate limiting, and routing for a complex distributed system.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=API+Gateway",
        tags: ["Node.js", "Express", "Redis", "Docker"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "backend"
    },
    {
        id: 4,
        title: "Analytics Dashboard",
        description: "Interactive data visualization dashboard with real-time metrics, filtering, and customizable chart components.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Analytics+Dashboard",
        tags: ["React", "D3.js", "WebSockets", "Material UI"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "frontend"
    },
    {
        id: 5,
        title: "Content Management System",
        description: "Headless CMS with a user-friendly interface for managing website content, media assets, and user permissions.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=CMS+System",
        tags: ["Node.js", "Express", "PostgreSQL", "GraphQL"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "backend"
    },
    {
        id: 6,
        title: "Real-time Chat Application",
        description: "Feature-rich messaging platform with private/group chats, file sharing, read receipts, and end-to-end encryption.",
        image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Chat+Application",
        tags: ["React", "Socket.io", "Express", "MongoDB"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        category: "fullstack"
    }
];

// Experience Data with detailed achievements
const EXPERIENCE = [
    {
        company: "Tech Innovations Inc.",
        role: "Senior Software Engineer",
        period: "2021 - Present",
        location: "San Francisco, CA",
        achievements: [
            "Led development of microservices architecture that improved system scalability by 40%",
            "Mentored 5 junior developers and established code review standards, reducing production bugs by 30%",
            "Implemented CI/CD pipelines that reduced deployment time from days to hours",
            "Optimized database queries and caching strategy, resulting in 3x faster page loads"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"]
    },
    {
        company: "DataSphere Solutions",
        role: "Full Stack Developer",
        period: "2018 - 2021",
        location: "Boston, MA",
        achievements: [
            "Developed and maintained client-facing web applications serving 50,000+ daily active users",
            "Designed and implemented RESTful APIs consumed by both web and mobile applications",
            "Collaborated with UX/UI team to implement responsive designs across all breakpoints",
            "Migrated legacy PHP system to a modern React/Node.js stack, improving performance by 60%"
        ],
        technologies: ["JavaScript", "Vue.js", "Express", "MongoDB", "AWS"]
    },
    {
        company: "WebCraft Agency",
        role: "Frontend Developer",
        period: "2016 - 2018",
        location: "Seattle, WA",
        achievements: [
            "Built interactive UI components for 15+ client websites with a focus on accessibility",
            "Implemented responsive designs ensuring compatibility across all modern browsers",
            "Created an internal component library that reduced development time by 25%",
            "Optimized website performance through code splitting and asset optimization techniques"
        ],
        technologies: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap", "Sass"]
    }
];

// Initialize Everything with enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // Initialize Typed.js with coding-focused strings
    const typedElement = document.querySelector('.typing');
    if (typedElement) {
        new Typed(typedElement, {
            strings: [
                'build scalable web applications',
                'solve complex technical challenges',
                'create intuitive user experiences',
                'architect robust backend systems',
                'optimize for performance',
                'love what I do'
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 1000,
            loop: true
        });
    }

    // Initialize all functionality
    initializeParticles();
    initializeVanillaTilt();
    initializeCustomCursor();
    initializeNavigation();
    initializeScrollReveal();
    initializeSkillTabs();
    initializeSkillBars();
    initializeProjects();
    initializeExperience();
    initializeContactForm();
    initializeThemeToggle();
    initializeScrollToTop();
    initializeGSAPAnimations();
});

// Initialize Particles with improved visuals
function initializeParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-bg');
    
    if (!particlesContainer) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);

    const particleCount = window.innerWidth > 768 ? 60 : 30;
    const particles = Array.from({ length: particleCount }, () => new Particle(canvas));

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

// Initialize VanillaTilt for card hover effects
function initializeVanillaTilt() {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    if (tiltElements.length === 0 || typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });
}

// Initialize Custom Cursor with interactive feedback
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Add effects when hovering over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, [data-tilt], .project-card, .filter-btn, .tab-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--primary-light)';
            cursor.style.borderWidth = '1px';
            cursor.style.backgroundColor = 'rgba(155, 135, 245, 0.2)';
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

// Initialize Navigation with active states and scroll events
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const menuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Handle scroll events for navbar styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    // Handle mobile menu toggle
    if (menuButton && nav) {
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
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial call to set active link on page load
    updateActiveNavLink();
}

// Initialize Scroll Reveal for element animations
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

// Initialize Skill Tabs functionality
function initializeSkillTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
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
                    const duration = 1500; // milliseconds
                    const interval = duration / target;
                    
                    const counter = setInterval(() => {
                        if (count < target) {
                            count++;
                            percentageDisplay.textContent = `${count}%`;
                        } else {
                            clearInterval(counter);
                        }
                    }, interval);
                }
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Project Filtering and Creation
function initializeProjects() {
    const filters = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;

    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}" data-tilt>
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                            GitHub
                        </a>
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
                                <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z" />
                            </svg>
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize projects
    projectsGrid.innerHTML = PROJECTS.map(createProjectCard).join('');
    initializeVanillaTilt(); // Reinitialize tilt for new cards

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
            
            // Using GSAP if available, fallback to CSS transitions
            if (typeof gsap !== 'undefined') {
                gsap.to(currentProjects, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    onComplete: () => {
                        updateProjectsGrid(filteredProjects);
                    }
                });
            } else {
                currentProjects.forEach(card => {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(20px)';
                });
                
                setTimeout(() => {
                    updateProjectsGrid(filteredProjects);
                }, 300);
            }
        });
    });
    
    function updateProjectsGrid(projects) {
        projectsGrid.innerHTML = projects.map(createProjectCard).join('');
        initializeVanillaTilt(); // Reinitialize tilt for new cards
        
        // Animate in new projects
        const newProjects = projectsGrid.querySelectorAll('.project-card');
        
        if (typeof gsap !== 'undefined') {
            gsap.from(newProjects, {
                opacity: 0,
                y: 20,
                stagger: 0.1
            });
        } else {
            newProjects.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" height="16" width="16">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
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
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = 1;
                entry.target.style.transform = entry.target.classList.contains('even') 
                    ? 'translateX(0)' 
                    : 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('even');
            item.style.opacity = 0;
            item.style.transform = 'translateX(-50px)';
        } else {
            item.classList.add('odd');
            item.style.opacity = 0;
            item.style.transform = 'translateX(50px)';
        }
        
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });
}

// Contact Form with validation and submission feedback
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Display sending state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
        
        // Simulate sending (replace with actual AJAX call)
        setTimeout(() => {
            showToast('Message sent successfully! I\'ll respond within 24 hours.');
            form.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }, 1500);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Theme Toggle with preference saving
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

// Scroll To Top Button
function initializeScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
}

// Toast Notification
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Remove previous toast classes
    toast.classList.remove('success', 'error');
    
    // Add type class
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ff4d4d 0%, #f84f62 100%)';
    } else {
        toast.style.background = 'linear-gradient(135deg, #9b87f5 0%, #7b67d5 100%)';
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
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
            gsap.from(section.querySelectorAll('h2, .section-subtitle, .about-card, .key-point, .code-showcase, .tab-btn, .project-card, .timeline-item, .education-item, .info-card, .contact-form'), {
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
