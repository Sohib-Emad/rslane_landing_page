/**
 * Rslane Online - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic QR Code based on current page URL
    const qrImg = document.getElementById('qrCodeImg');
    if (qrImg) {
        const currentUrl = window.location.href.split('#')[0];
        // Encode URL to generate QR that points to current page or direct APK
        const targetDownloadUrl = window.location.origin + window.location.pathname.replace(/\/$/, '') + '/downloads/rslane-app.apk';
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(targetDownloadUrl)}&color=070a12&bgcolor=ffffff`;
    }

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 3. Phone Mockup Image Slideshow (Screens 1 to 7 in order)
    const heroScreenImg = document.getElementById('heroScreenImg');
    const screens = [
        'assets/screens/1.png',
        'assets/screens/2.png',
        'assets/screens/3.png',
        'assets/screens/4.png',
        'assets/screens/5.png',
        'assets/screens/6.png',
        'assets/screens/7.png'
    ];
    let currentScreenIndex = 0;
    const dots = document.querySelectorAll('.p-dot');

    // Preload images for instant switching
    screens.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function updateScreen(index) {
        if (!heroScreenImg) return;
        currentScreenIndex = index;
        heroScreenImg.style.opacity = '0';
        setTimeout(() => {
            heroScreenImg.src = screens[currentScreenIndex];
            heroScreenImg.style.opacity = '1';
        }, 220);

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentScreenIndex);
        });
    }

    let slideInterval;
    function startSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            const nextIndex = (currentScreenIndex + 1) % screens.length;
            updateScreen(nextIndex);
        }, 3200);
    }

    if (heroScreenImg) {
        startSlideTimer();

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateScreen(idx);
                startSlideTimer(); // reset interval on user click
            });
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Download Button Toast / Notification Feedback
    const downloadBtns = document.querySelectorAll('a[download]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('🚀 بدأ تنزيل التطبيق الآن! تفقد شريط الإشعارات بهاتفك.');
        });
    });

    function showToast(message) {
        let toast = document.querySelector('.download-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'download-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4500);
    }
});

// Toast Notification Styles injection
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.download-toast {
    position: fixed;
    bottom: 25px;
    right: 50%;
    transform: translateX(50%) translateY(100px);
    background: #1e293b;
    color: #f8fafc;
    border: 1px solid #f59e0b;
    padding: 1rem 1.75rem;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(245, 158, 11, 0.3);
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    max-width: 90%;
}
.download-toast.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}
`;
document.head.appendChild(toastStyle);
