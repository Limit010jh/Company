document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.reveal');

  // --- Mobile Hamburger Navigation ---
  const toggleMobileMenu = () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside of the navbar
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // --- Header Scrolled Background Blur ---
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  // Initial check on load
  handleHeaderScroll();

  // --- Scroll Reveal Animations ---
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating in to preserve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Active Nav Link Scrolling Observer ---
  const sections = document.querySelectorAll('section');
  const navObserverOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -20% 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          // Check if link href matches current section ID
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // --- Form Submit Aesthetics ---
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      // Feedback state
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.8';
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-circle-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.pointerEvents = '';
          submitBtn.style.opacity = '';
        }, 3000);
      }, 1500);
    });
  }
});
