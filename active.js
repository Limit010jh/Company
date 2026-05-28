document.addEventListener('DOMContentLoaded', () => {
  
  // 1. كسر الشاشة السوداء (إجبار العناصر على الظهور)
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(element => {
    element.classList.add('active');
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'translateY(0)';
  });

  // 2. تفعيل القائمة الجانبية (Hamburger)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // 3. كود n8n لإرسال النموذج
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

      const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        message: document.getElementById('message')?.value || ''
      };

      try {
        const response = await fetch('https://limit22274.app.n8n.cloud/webhook/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('تم إرسال رسالتك بنجاح!');
          contactForm.reset();
        } else {
          alert('عذراً، حدث خطأ في الخادم.');
        }
      } catch (error) {
        alert('عذراً، حدث خطأ في الاتصال.');
        console.error('Fetch Error:', error);
      } finally {
        if (submitBtn) submitBtn.innerHTML = originalText;
      }
    });
  }
});
