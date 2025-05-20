// scripts.js
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.getElementById('header').offsetHeight || 76;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            const nav = document.querySelector('#header nav');
            const body = document.body;
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                body.classList.remove('nav-active');
            }
        }
    });
});

// Copy CA Function
function copyCA(textToCopy, buttonElement) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        const feedbackSpan = buttonElement.nextElementSibling;
        if (feedbackSpan && feedbackSpan.classList.contains('copied-feedback')) {
            feedbackSpan.textContent = 'Copied!';
            buttonElement.disabled = true;
            setTimeout(() => {
                feedbackSpan.textContent = '';
                buttonElement.disabled = false;
            }, 2000);
        } else if (buttonElement.querySelector('.copied-feedback')) { // Check if feedback is inside button
             const innerFeedbackSpan = buttonElement.querySelector('.copied-feedback');
             innerFeedbackSpan.textContent = 'Copied!';
             buttonElement.disabled = true;
            setTimeout(() => {
                innerFeedbackSpan.textContent = '';
                buttonElement.disabled = false;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        const feedbackSpan = buttonElement.nextElementSibling;
         if (feedbackSpan && feedbackSpan.classList.contains('copied-feedback')) {
            feedbackSpan.textContent = 'Failed!';
            setTimeout(() => {
                feedbackSpan.textContent = '';
            }, 2000);
        } else if (buttonElement.querySelector('.copied-feedback')) {
             const innerFeedbackSpan = buttonElement.querySelector('.copied-feedback');
             innerFeedbackSpan.textContent = 'Failed!';
            setTimeout(() => {
                innerFeedbackSpan.textContent = '';
            }, 2000);
        }
    });
}

// Scroll Animations
const animatedElements = document.querySelectorAll('.animated-element');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

animatedElements.forEach(el => {
    observer.observe(el);
});

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('#header nav');
const body = document.body;

if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        body.classList.toggle('nav-active');
    });
}
