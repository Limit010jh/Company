/** * ملف active.js - التحكم الكامل في الموقع
 * الإصدار: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. القائمة الجانبية (Hamburger Menu) ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- 2. ظهور العناصر عند التمرير (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // --- 3. إدارة نموذج الاتصال وإرسال البيانات إلى n8n ---
    const contactForm = document.getElementById('project-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // تجهيز البيانات
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';
            const submitBtn = contactForm.querySelector('.btn-submit');
            
            // تحديث واجهة الزر
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                // إرسال البيانات (استخدم رابط الـ Test لـ n8n)
                const response = await fetch('https://limit22274.app.n8n.cloud/webhook/75350ef9-5399-4bb3-995c-56ebd8ab7244', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                });

                if (response.ok) {
                    alert('تم إرسال الرسالة بنجاح!');
                    contactForm.reset();
                } else {
                    throw new Error('Server Error');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('خطأ في الاتصال! تأكد من أن n8n في وضع "Listen for test event"');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- 4. تأثير التمرير للشريط العلوي (Header Blur) ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    console.log("active.js loaded successfully - lines 1 to 90");
});
