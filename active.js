document.addEventListener('DOMContentLoaded', () => {
  // 1. القائمة الجانبية (Hamburger Menu)
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    const toggleMobileMenu = () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    };
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));
  }

  // 2. حركة التمرير للشريط العلوي (Header Blur)
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // 3. ظهور العناصر عند التمرير (Scroll Reveal Animations)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(element => revealObserver.observe(element));

  // 4. إرسال النموذج إلى n8n
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.style.pointerEvents = 'none';
      }

      const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        message: document.getElementById('message')?.value || ''
      };

      try {
        const response = await fetch('https://limit22274.app.n8n.cloud/webhook-test/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          if (submitBtn) {
            submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-circle-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)';
          }
          contactForm.reset();
        } else {
          throw new Error('Server Error');
        }
      } catch (error) {
        console.error('Error:', error);
        if (submitBtn) submitBtn.innerHTML = 'Error! Try again';
      }

      // إعادة الزر لحالته بعد 3 ثواني
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.pointerEvents = '';
        }
      }, 3000);
    });
  }
});
