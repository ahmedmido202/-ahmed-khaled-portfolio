/**
 * Portfolio JavaScript - Ahmed Khaled (Junior Data Engineer)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    const allNavLinks = navLinks.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Navbar blur background increase on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)';
      navbar.style.borderBottomColor = 'rgba(56, 189, 248, 0.15)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = 'var(--border-color)';
    }
  });
});

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('messageSubject').value.trim();
  const message = document.getElementById('messageText').value.trim();
  const notification = document.getElementById('formNotification');
  const submitBtn = document.getElementById('btnSubmitMessage');

  if (!name || !email || !message) {
    if (notification) {
      notification.style.display = 'block';
      notification.style.background = 'rgba(239, 68, 68, 0.15)';
      notification.style.color = '#f87171';
      notification.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      notification.textContent = 'Please fill in all required fields.';
    }
    return;
  }

  // Visual success feedback
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Opening Mail Client...</span>';
  }

  if (notification) {
    notification.style.display = 'block';
    notification.style.background = 'rgba(16, 185, 129, 0.15)';
    notification.style.color = '#34d399';
    notification.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    notification.textContent = 'Thank you! Redirecting to LinkedIn & your email client to connect with Ahmed.';
  }

  // Construct mailto link
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        <span>Send Message</span>
      `;
    }
  }, 1000);
}
