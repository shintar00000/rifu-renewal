// 里風総合型クラブ上牧 JavaScript
// 設計書準拠のモダンUI機能実装

'use strict';

// Global variables
let currentStep = 1;
let formData = {};
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('里風総合型クラブ上牧 - サイト初期化開始');
    
    initializeLoading();
    initializeParticles();
    initializeNavigation();
    initializeClassFilters();
    initializeStepForm();
    initializeCalendar();
    initializeAnimations();
    initializeBackToTop();
    initializeSNSIntegration();
    
    console.log('サイト初期化完了');
});

// ===== Loading Screen =====
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// ===== Particles Background =====
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#E5338A", "#FFD84D", "#F056A1"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#E5338A",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// ===== Navigation =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header background on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 100) {
                header.style.background = 'rgba(253, 245, 247, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(229, 51, 138, 0.15)';
            } else {
                header.style.background = 'rgba(253, 245, 247, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header based on scroll direction
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = scrollY;
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav item highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// ===== F-01: 教室カタログ機能（フィルタ・検索） =====
function initializeClassFilters() {
    const dayFilter = document.getElementById('day-filter');
    const targetFilter = document.getElementById('target-filter');
    const searchInput = document.getElementById('class-search');
    const classCards = document.querySelectorAll('.class-card');
    
    if (!dayFilter || !targetFilter || !searchInput) return;
    
    function filterClasses() {
        const dayValue = dayFilter.value;
        const targetValue = targetFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        
        let visibleCount = 0;
        
        classCards.forEach(card => {
            const cardDay = card.getAttribute('data-day') || '';
            const cardTarget = card.getAttribute('data-target') || '';
            const cardName = card.getAttribute('data-name') || '';
            
            // Check filters
            const dayMatch = !dayValue || cardDay.includes(dayValue);
            const targetMatch = !targetValue || cardTarget.includes(targetValue);
            const searchMatch = !searchValue || cardName.toLowerCase().includes(searchValue);
            
            if (dayMatch && targetMatch && searchMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide "no results" message
        showNoResultsMessage(visibleCount === 0);
    }
    
    function showNoResultsMessage(show) {
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #737373;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #E5338A;"></i>
                    <h3>検索条件に一致する教室が見つかりませんでした</h3>
                    <p>フィルター条件を変更してお試しください</p>
                </div>
            `;
            document.querySelector('.classes-grid').appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Event listeners
    dayFilter.addEventListener('change', filterClasses);
    targetFilter.addEventListener('change', filterClasses);
    searchInput.addEventListener('input', debounce(filterClasses, 300));
    
    // Clear filters button
    const clearButton = document.createElement('button');
    clearButton.className = 'btn btn-outline';
    clearButton.innerHTML = '<i class="fas fa-times"></i> フィルターをクリア';
    clearButton.style.marginTop = '1rem';
    
    clearButton.addEventListener('click', () => {
        dayFilter.value = '';
        targetFilter.value = '';
        searchInput.value = '';
        filterClasses();
    });
    
    document.querySelector('.filter-controls').appendChild(clearButton);
}

// ===== F-02: ステップフォーム =====
function initializeStepForm() {
    const form = document.getElementById('contact-form');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-form');
    const inquiryType = document.getElementById('inquiry-type');
    const classSelection = document.getElementById('class-selection');
    
    if (!form) return;
    
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
        
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed');
            if (index + 1 === stepNumber) {
                indicator.classList.add('active');
            } else if (index + 1 < stepNumber) {
                indicator.classList.add('completed');
            }
        });
        
        // Update navigation buttons
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
        nextBtn.style.display = stepNumber === 3 ? 'none' : 'inline-flex';
        submitBtn.style.display = stepNumber === 3 ? 'inline-flex' : 'none';
        
        currentStep = stepNumber;
    }
    
    function validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (!currentStepElement) return false;
        
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Email validation
        const emailField = currentStepElement.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.classList.add('error');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function collectFormData() {
        const data = new FormData(form);
        formData = {};
        
        for (let [key, value] of data.entries()) {
            formData[key] = value;
        }
        
        return formData;
    }
    
    function displayConfirmation() {
        const confirmationContent = document.querySelector('.confirmation-content');
        if (!confirmationContent) return;
        
        const data = collectFormData();
        
        confirmationContent.innerHTML = `
            <div class="confirmation-section">
                <h4>基本情報</h4>
                <p><strong>お名前:</strong> ${data.lastName || ''} ${data.firstName || ''}</p>
                <p><strong>フリガナ:</strong> ${data.lastNameKana || ''} ${data.firstNameKana || ''}</p>
                <p><strong>メールアドレス:</strong> ${data.email || ''}</p>
                <p><strong>電話番号:</strong> ${data.phone || ''}</p>
                ${data.age ? `<p><strong>年齢:</strong> ${data.age}</p>` : ''}
            </div>
            <div class="confirmation-section">
                <h4>お問い合わせ内容</h4>
                <p><strong>種類:</strong> ${data.inquiryType || ''}</p>
                ${data.interestedClass ? `<p><strong>興味のある教室:</strong> ${data.interestedClass}</p>` : ''}
                <p><strong>詳細:</strong> ${data.message || ''}</p>
            </div>
        `;
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep === 2) {
                    displayConfirmation();
                }
                showStep(currentStep + 1);
            } else {
                showValidationError();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    }
    
    // Show/hide class selection based on inquiry type
    if (inquiryType && classSelection) {
        inquiryType.addEventListener('change', () => {
            const showClassSelection = ['体験申込', '入会について', '教室について'].includes(inquiryType.value);
            classSelection.style.display = showClassSelection ? 'block' : 'none';
            
            if (showClassSelection) {
                classSelection.querySelector('select').setAttribute('required', 'required');
            } else {
                classSelection.querySelector('select').removeAttribute('required');
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateStep(3)) {
                submitForm();
            }
        });
    }
    
    function showValidationError() {
        // Show toast message
        showToast('必須項目を入力してください', 'error');
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showToast('お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。', 'success');
            form.reset();
            showStep(1);
            
            submitBtn.innerHTML = '送信する';
            submitBtn.disabled = false;
        }, 2000);
    }
}

// ===== F-03: イベントカレンダー =====
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (!calendarGrid) return;
    
    const monthNames = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    
    // Sample events data
    const events = {
        '2025-07-15': { title: '夏祭り体験会', type: 'event' },
        '2025-07-22': { title: '健康講座', type: 'lecture' },
        '2025-07-29': { title: 'バレーボール大会', type: 'tournament' },
        '2025-08-05': { title: '親子体操教室', type: 'class' },
        '2025-08-12': { title: 'シニア健康相談', type: 'consultation' }
    };
    
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        calendarTitle.textContent = `${year}年${monthNames[month]}`;
        
        let html = '';
        
        // Day headers
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = events[dateStr];
            const isToday = isDateToday(year, month, day);
            
            let dayClass = 'calendar-day';
            if (isToday) dayClass += ' today';
            if (event) dayClass += ` has-event ${event.type}`;
            
            html += `
                <div class="${dayClass}" data-date="${dateStr}">
                    <span class="day-number">${day}</span>
                    ${event ? `<div class="event-dot" title="${event.title}"></div>` : ''}
                </div>
            `;
        }
        
        calendarGrid.innerHTML = html;
        
        // Add click events to calendar days
        calendarGrid.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', () => {
                const date = day.getAttribute('data-date');
                if (events[date]) {
                    showEventDetails(events[date], date);
                }
            });
        });
    }
    
    function isDateToday(year, month, day) {
        const today = new Date();
        return year === today.getFullYear() && 
               month === today.getMonth() && 
               day === today.getDate();
    }
    
    function showEventDetails(event, date) {
        const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        showToast(`${formattedDate}: ${event.title}`, 'info');
    }
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Initialize calendar
    generateCalendar(currentMonth, currentYear);
}

// ===== Animations =====
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            once: true,
            offset: 100
        });
    }
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.class-card, .blog-card, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * (target - start) + start);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== Back to Top Button =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SNS Integration =====
function initializeSNSIntegration() {
    // LINE友だち追加バナー
    const lineButtons = document.querySelectorAll('.sns-line');
    lineButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // LINE友だち追加のURL（実際のLINE公式アカウントのURLに置き換える）
            window.open('https://line.me/R/ti/p/@rifu-kanmaki', '_blank');
        });
    });
    
    // Instagram link
    const instagramButtons = document.querySelectorAll('.sns-instagram');
    instagramButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://instagram.com/rifu_kanmaki', '_blank');
        });
    });
    
    // Facebook link
    const facebookButtons = document.querySelectorAll('.sns-facebook');
    facebookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://facebook.com/rifu.kanmaki', '_blank');
        });
    });
}

// ===== Utility Functions =====

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    // Add toast styles if not present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                padding: 1rem;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
                max-width: 400px;
                border-left: 4px solid;
            }
            .toast.show { transform: translateX(0); }
            .toast-success { border-left-color: #10B981; }
            .toast-error { border-left-color: #EF4444; }
            .toast-info { border-left-color: #3B82F6; }
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .toast-content i {
                font-size: 1.25rem;
            }
            .toast-success i { color: #10B981; }
            .toast-error i { color: #EF4444; }
            .toast-info i { color: #3B82F6; }
            .toast-close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: #6B7280;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeToast(toast), 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

function removeToast(toast) {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Form validation utility
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\-\(\)\+\s]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close modals, mobile menu, etc.
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
            
            const mobileMenu = document.querySelector('.nav-menu.active');
            if (mobileMenu) {
                document.querySelector('.hamburger').click();
            }
        }
    });
    
    // Focus management for mobile menu
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
    }
}

// Initialize accessibility features
initializeAccessibility();

// Language toggle functionality (準備)
function initializeLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 将来的に多言語対応を実装する際の準備
            showToast('多言語機能は近日実装予定です', 'info');
        });
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Core Web Vitals measurement (設計書要件)
    if (typeof PerformanceObserver !== 'undefined') {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // CLS (Cumulative Layout Shift)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }).observe({entryTypes: ['layout-shift']});
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageToggle();
    initializePerformanceMonitoring();
});

console.log('🎉 里風総合型クラブ上牧 - 全機能ロード完了');