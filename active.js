document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('project-contact-form');

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
  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // --- Header Scrolled Background Blur ---
  const handleHeaderScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  // --- Scroll Reveal Animations ---
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Form Submit & Webhook Integration ---
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;

      // تحديث واجهة الزر أثناء الإرسال
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.style.pointerEvents = 'none';

      // تجهيز البيانات (تأكد أن الـ name في الـ HTML يطابق هذه القيم)
      const formData = {
        name: contactForm.querySelector('[name="name"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        message: contactForm.querySelector('[name="message"]').value
      };

      try {
        // استبدل الرابط برابط الـ Webhook الخاص بك (استخدم Production URL للعمل الفعلي)
        const response = await fetch('https://limit22274.app.n8n.cloud/webhook-test/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-circle-check"></i>';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)';
          contactForm.reset();
        } else {
          throw new Error('فشل في إرسال البيانات');
        }
      } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = 'Error! Try again';
      }

      // إعادة الزر لحالته الأصلية
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.pointerEvents = '';
      }, 3000);
    });
  }
});
