document.addEventListener('DOMContentLoaded', () => {
  
  // 1. القائمة الجانبية
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // 2. كود الـ Reveal (الذي يمنع الشاشة من أن تكون سوداء)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // 3. إرسال البيانات (Webhook)
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        message: document.getElementById('message')?.value
      };

      try {
        await fetch('https://limit22274.app.n8n.cloud/webhook/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        alert('تم الإرسال بنجاح!');
        contactForm.reset();
      } catch (err) {
        alert('حدث خطأ في الإرسال');
      }
    });
  }
});
