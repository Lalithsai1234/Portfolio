// Mobile Navigation Toggle
const toggleBtn = document.querySelector('.togglebtn');
const navLinks = document.querySelector('.navlinks');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('click');
    navLinks.classList.toggle('open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => {
        toggleBtn.classList.remove('click');
        navLinks.classList.remove('open');
    });
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.7)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Skill level animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.setProperty('--skill-width', level + '%');
                skill.classList.add('animate');
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form handling
// --- THIS IS THE PART YOU REPLACE ---
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
const originalBtnHTML = submitBtn.innerHTML; // Store the original button content

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Update button to show "Sending..."
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Send the data to Formspree using the 'fetch' API
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success!
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset(); // Clear the form
            // Also reset the 'focused' class on labels after clearing the form
            document.querySelectorAll('.form-group.focused').forEach(el => {
                el.classList.remove('focused');
            });
        } else {
            // There was an error
            alert('Oops! There was a problem submitting your form. Please try again.');
        }
    }).catch(error => {
        // Network error
        console.error('Error:', error);
        alert('Oops! There was a network error. Please try again.');
    }).finally(() => {
        // Always reset the button text and state
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
    });
});
// --- END OF REPLACEMENT ---


// --- KEEP THIS PART AS IT IS ---
// Floating label effect for form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});
// Scroll animations
const scrollElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled-in-view');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled-in-view');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Download resume function
function downloadResume() {
    // Create a simple resume content
    const resumeContent = `
LALITH SAI
Full Stack Developer & Software Engineer

CONTACT INFORMATION
Email: lalithsai@example.com
Phone: +1 (234) 567-8900
Location: Your City, Country
GitHub: github.com/lalithsai
LinkedIn: linkedin.com/in/lalithsai

PROFESSIONAL SUMMARY
Passionate Full Stack Developer with 3+ years of experience in creating innovative web applications and solving complex problems through clean, efficient code. Specialized in modern web technologies including React, Node.js, and cloud solutions.

TECHNICAL SKILLS
Frontend: React.js, Vue.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, Python, RESTful APIs, GraphQL
Databases: MongoDB, PostgreSQL, MySQL
Tools & Technologies: Git, Docker, AWS, CI/CD, Jest, Webpack
Other: Agile/Scrum, Test-Driven Development, Responsive Design

PROFESSIONAL EXPERIENCE

Senior Full Stack Developer | Tech Solutions Inc. | 2022 - Present
• Leading development of scalable web applications serving 10,000+ users
• Improved application performance by 40% through optimization techniques
• Led a team of 5 developers in agile development environment
• Developed 15+ full-stack applications using React, Node.js, and cloud technologies

Full Stack Developer | Digital Innovations Ltd. | 2021 - 2022
• Built responsive web applications using modern JavaScript frameworks
• Integrated third-party APIs and payment gateways (Stripe, PayPal)
• Implemented automated testing and CI/CD pipelines
• Collaborated with cross-functional teams to deliver high-quality solutions

Frontend Developer | StartUp Ventures | 2020 - 2021
• Developed pixel-perfect, responsive user interfaces for 10+ projects
• Collaborated with UX/UI designers to implement design systems
• Optimized applications for maximum speed and scalability
• Reduced page load times by 35% through performance optimization

EDUCATION
Bachelor of Technology in Computer Science Engineering | 2016 - 2020
• Graduated with honors (GPA: 3.8/4.0)
• Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering
• Active participant in coding competitions and tech communities

FEATURED PROJECTS

E-Commerce Platform
• Full-stack e-commerce solution with React, Node.js, and MongoDB
• Features: User authentication, payment integration, admin dashboard
• Technologies: React, Node.js, MongoDB, Stripe API

Task Management System
• Collaborative task management application with real-time updates
• Features: Drag-and-drop functionality, team collaboration, notifications
• Technologies: Vue.js, Socket.io, Express, PostgreSQL

Weather Analytics Dashboard
• Interactive weather dashboard with data visualization and forecasting
• Features: Location-based tracking, historical data analysis
• Technologies: React, D3.js, Weather API, Chart.js

CERTIFICATIONS
• AWS Certified Developer - Associate (2023)
• MongoDB Certified Developer (2022)
• Google Analytics Certified (2021)

ACHIEVEMENTS
• Led development team that won "Best Innovation Award" at company hackathon
• Contributed to open-source projects with 500+ GitHub stars
• Speaker at local tech meetups on modern web development practices
• Mentored 10+ junior developers in full-stack development
    `;

    // Create and download the resume
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lalith_Sai_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation classes
    setTimeout(() => {
        document.querySelector('.hero-text').classList.add('animate-in');
        document.querySelector('.hero-pic').classList.add('animate-in');
    }, 500);
    
    // Initialize scroll animations
    handleScrollAnimation();
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});