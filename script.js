// 1. Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});

// 2. Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 3. Premium Scroll Animation (Fade up effect on scroll)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-on-scroll');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-on-scroll').forEach((el) => {
    observer.observe(el);
});

// 4. Active Nav Link Highlighting on Scroll
const sections = document.querySelectorAll('section, header, footer');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 5. Show Card Modal Interactivity
const showCardBtn = document.getElementById('show-card-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cardModal = document.getElementById('card-modal');

if (showCardBtn && cardModal) {
    showCardBtn.addEventListener('click', () => {
        cardModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        cardModal.classList.remove('active');
    });

    cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) {
            cardModal.classList.remove('active');
        }
    });
}
