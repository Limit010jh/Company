document.addEventListener('DOMContentLoaded', () => {
  // 1. تحديد العناصر من الصفحة
  const contactForm = document.getElementById('project-contact-form');
  const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

  // 2. التحقق من وجود النموذج
  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // منع إعادة تحميل الصفحة

      // حفظ النص الأصلي للزر
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.style.pointerEvents = 'none';

      // تجهيز البيانات
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        // [ملاحظة]: ضع هنا رابط الـ Production URL الخاص بـ Webhook في n8n
        const response = await fetch('https://limit22274.app.n8n.cloud/webhook/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-circle-check"></i>';
          contactForm.reset(); // تفريغ الحقول بعد الإرسال
        } else {
          throw new Error('فشل الإرسال');
        }
      } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = 'Error, try again';
      }

      // العودة للحالة الأصلية بعد 3 ثواني
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.pointerEvents = '';
      }, 3000);
    });
  }
});
