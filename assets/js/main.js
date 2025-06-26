// JavaScript Principal - Clínica Integrar V2.0

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled / (document.body.scrollHeight - window.innerHeight);
        
        // Update progress bar
        progressBar.style.width = `${rate * 100}%`;
        
        // Header background effect
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Intersection Observer for Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter.parentElement);
    });

    // Parallax Effect for Floating Elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            }, 2000);
        });
    }

    // Email Validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Specialty Cards Interaction
    const specialtyCards = document.querySelectorAll('.specialty-card');
    specialtyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Team Cards Interaction
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const modal = document.getElementById('team-modal');
            const memberData = JSON.parse(this.dataset.member);
            
            if (modal && memberData) {
                populateTeamModal(memberData);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Modal Functions
    function populateTeamModal(memberData) {
        const modal = document.getElementById('team-modal');
        modal.querySelector('.modal-name').textContent = memberData.name;
        modal.querySelector('.modal-role').textContent = memberData.role;
        modal.querySelector('.modal-bio').textContent = memberData.bio;
        modal.querySelector('.modal-image').src = memberData.image;
    }

    // Close Modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // Testimonials Carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let currentSlide = 0;
        const slides = testimonialCarousel.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Auto-play carousel
        setInterval(nextSlide, 5000);
        
        // Navigation buttons
        const nextBtn = document.querySelector('.carousel-next');
        const prevBtn = document.querySelector('.carousel-prev');
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Initialize carousel
        showSlide(0);
    }

    // WhatsApp Button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5563992078464?text=Olá! Gostaria de agendar uma consulta na Clínica Integrar.';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-btn';
    whatsappBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
    `;
    document.body.appendChild(whatsappBtn);

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close mobile menu
            if (mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Performance Monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }

    // Service Worker Registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Error Handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send this to an error tracking service
    });

    // Console Welcome Message
    console.log('%c🏥 Clínica Integrar V2.0', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cSite desenvolvido com HTML5, Tailwind CSS e JavaScript', 'color: #4a5568; font-size: 14px;');
    console.log('%cPara mais informações: https://clinicaintegrar.com.br', 'color: #667eea; font-size: 12px;');

});

// Utility Functions
const Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format phone number
    formatPhone: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },

    // Animate element
    animate: function(element, animation, duration = 1000) {
        return new Promise((resolve) => {
            element.style.animationDuration = `${duration}ms`;
            element.classList.add(animation);
            
            element.addEventListener('animationend', () => {
                element.classList.remove(animation);
                resolve();
            }, { once: true });
        });
    }
};

// Export for use in other scripts
window.ClinicaIntegrar = {
    Utils
};


// Team Modal Functionality
class TeamModal {
    constructor() {
        this.modal = document.getElementById('team-modal');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.closeButtons = this.modal.querySelectorAll('.modal-close, .modal-close-cta, .modal-overlay');
        this.teamCards = document.querySelectorAll('.team-card');
        
        this.init();
    }
    
    init() {
        // Add click listeners to team cards
        this.teamCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const memberData = JSON.parse(card.dataset.member);
                this.openModal(memberData);
            });
        });
        
        // Add close listeners
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(memberData) {
        // Populate modal with member data
        this.populateModal(memberData);
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            this.modalContent.style.transform = 'scale(1)';
        }, 10);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.modalContent.style.transform = 'scale(0.95)';
    }
    
    populateModal(data) {
        // Update modal content
        this.modal.querySelector('.modal-name').textContent = data.name;
        this.modal.querySelector('.modal-role').textContent = data.role;
        this.modal.querySelector('.modal-bio').textContent = data.bio;
        this.modal.querySelector('.modal-experience').textContent = data.experience;
        this.modal.querySelector('.modal-education').textContent = data.education;
        this.modal.querySelector('.modal-image').textContent = data.image;
        
        // Update specialties
        const specialtiesContainer = this.modal.querySelector('.modal-specialties');
        specialtiesContainer.innerHTML = '';
        
        data.specialties.forEach(specialty => {
            const tag = document.createElement('div');
            tag.className = 'specialty-tag';
            tag.textContent = specialty;
            specialtiesContainer.appendChild(tag);
        });
        
        // Update header gradient based on role
        const header = this.modal.querySelector('.h-48');
        const roleColors = {
            'Diretora Administrativa': 'from-primary-100 to-secondary-100',
            'Fonoaudióloga': 'from-blue-100 to-cyan-100',
            'Fisioterapeuta': 'from-green-100 to-emerald-100',
            'Psicóloga': 'from-purple-100 to-pink-100',
            'Terapeuta Ocupacional': 'from-orange-100 to-red-100',
            'Nutricionista': 'from-teal-100 to-cyan-100'
        };
        
        // Reset classes
        header.className = 'h-48 bg-gradient-to-br flex items-center justify-center rounded-t-3xl';
        header.classList.add(roleColors[data.role] || 'from-primary-100 to-secondary-100');
    }
}

// Testimonials Carousel (Enhanced)
class TestimonialsCarousel {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.testimonials.length === 0) return;
        
        // Add hover pause functionality
        this.testimonials.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });
            
            card.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        });
        
        this.startAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.highlightNext();
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    highlightNext() {
        // Remove highlight from current
        this.testimonials[this.currentIndex].style.transform = 'scale(1)';
        this.testimonials[this.currentIndex].style.boxShadow = '';
        
        // Move to next
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        
        // Highlight new current
        this.testimonials[this.currentIndex].style.transform = 'scale(1.05)';
        this.testimonials[this.currentIndex].style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        this.testimonials[this.currentIndex].style.transition = 'all 0.3s ease';
    }
}

// Enhanced Statistics Counter
class StatisticsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        if (this.counters.length === 0) return;
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the first counter
        if (this.counters[0]) {
            observer.observe(this.counters[0]);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    initializeApp();
    
    // Initialize new features
    new TeamModal();
    new TestimonialsCarousel();
    new StatisticsCounter();
    
    // Enhanced smooth scrolling for team modal CTA
    document.addEventListener('click', function(e) {
        if (e.target.closest('.modal-close-cta')) {
            setTimeout(() => {
                const contactSection = document.getElementById('contato');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        }
    });
    
    // Add testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

