// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0%';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const finalNumber = statNumber.textContent;
                const number = parseInt(finalNumber);
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            statNumber.textContent = finalNumber;
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Here you would typically send this to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. In a real implementation, this would be sent to your email.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
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

// Add fade-in animation on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});

// Hero section should be visible immediately
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

// Certificate Modal Functionality - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCertificateSystem();
});

// Automatically add certificate badges to any element with data-certificate attribute
// This makes it easy to add certificates - just add data-certificate="filename.pdf" to any card
function addCertificateBadges() {
    // Find all elements with data-certificate that don't already have a badge
    const elementsWithCertificates = document.querySelectorAll('[data-certificate]:not(.certificate-link)');
    
    elementsWithCertificates.forEach(element => {
        // Check if badge already exists
        if (!element.querySelector('.certificate-badge')) {
            // Find the content area (course-content or achievement-content)
            const contentArea = element.querySelector('.course-content') || element.querySelector('.achievement-content');
            
            if (contentArea) {
                // Create and add certificate badge
                const badge = document.createElement('div');
                badge.className = 'certificate-badge';
                badge.innerHTML = '<i class="fas fa-certificate"></i> Certificate Available';
                contentArea.appendChild(badge);
            }
        }
    });
}

// Initialize certificate system
function initializeCertificateSystem() {
    // Get modal elements
    const certificateModal = document.getElementById('certificateModal');
    const certificateFrame = document.getElementById('certificateFrame');
    const certificateDownload = document.getElementById('certificateDownload');
    const certificateClose = document.querySelector('.certificate-close');
    
    if (!certificateModal || !certificateFrame || !certificateDownload) {
        console.error('Certificate modal elements not found');
        return;
    }
    
    // Function to open certificate modal
    function openCertificateModal(certificateFile) {
        const certificatePath = `certificates/${certificateFile}`;
        
        // Set iframe source and download link
        certificateFrame.src = certificatePath;
        certificateDownload.href = certificatePath;
        certificateDownload.download = certificateFile;
        
        // Show modal
        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close certificate modal
    function closeCertificateModal() {
        certificateModal.classList.remove('active');
        certificateFrame.src = ''; // Clear iframe to stop loading
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add certificate badges automatically
    addCertificateBadges();
    
    // Get all course cards with certificates
    const courseCards = document.querySelectorAll('.course-card[data-certificate]');
    
    // Get all achievement cards with certificates
    const achievementCards = document.querySelectorAll('.achievement-card[data-certificate]');
    
    // Get all certificate links
    const certificateLinks = document.querySelectorAll('.certificate-link[data-certificate]');
    
    // Add click event to course cards
    courseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const certificateFile = this.getAttribute('data-certificate');
            if (certificateFile) {
                openCertificateModal(certificateFile);
            }
        });
    });
    
    // Add click event to achievement cards
    achievementCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const certificateFile = this.getAttribute('data-certificate');
            if (certificateFile) {
                openCertificateModal(certificateFile);
            }
        });
    });
    
    // Add click event to certificate links
    certificateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const certificateFile = this.getAttribute('data-certificate');
            if (certificateFile) {
                openCertificateModal(certificateFile);
            }
        });
    });
    
    // Close modal when clicking X
    if (certificateClose) {
        certificateClose.addEventListener('click', function() {
            closeCertificateModal();
        });
    }
    
    // Close modal when clicking outside the modal content
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            closeCertificateModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
}

// Also run on page load in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCertificateSystem);
} else {
    // DOM is already ready
    initializeCertificateSystem();
}


