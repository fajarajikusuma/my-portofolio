// =============================================
// SCROLL TO TOP
// =============================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
    const scrollBtn = document.getElementById("scrollToTopButton");
    if (window.scrollY > 200) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
});

// =============================================
// AOS INIT
// =============================================
AOS.init({ duration: 1000, once: false });

// =============================================
// SMOOTH SCROLL (anchor links)
// =============================================
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
            const navbar = document.querySelector('header');
            const navbarHeight = navbar ? navbar.offsetHeight + 20 : 80;
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            // tutup mobile menu jika terbuka
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// =============================================
// MOBILE NAVBAR TOGGLE
// =============================================
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// =============================================
// ABOUT TABS
// =============================================
function switchTab(tab) {
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(p => p.classList.add('hidden'));

    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => {
        b.classList.remove('tab-active');
        b.classList.add('text-gray-400');
    });

    const activePane = document.getElementById('pane-' + tab);
    const activeBtn = document.getElementById('tab-' + tab);

    if (activePane) activePane.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.add('tab-active');
        activeBtn.classList.remove('text-gray-400');
    }
}

// =============================================
// MODAL HANDLERS
// =============================================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function closeModalOutside(event, id) {
    // tutup hanya jika klik langsung di overlay (bukan di dalam modal-box)
    if (event.target === event.currentTarget) {
        closeModal(id);
    }
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }
});

// =============================================
// SECURITY: cegah inspect, copy, drag, dll
// =============================================
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (event.ctrlKey && key === 'u')) {
        event.preventDefault();
    }
});
document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('cut', event => event.preventDefault());
document.addEventListener('paste', event => event.preventDefault());
document.addEventListener('selectstart', event => event.preventDefault());
document.addEventListener('contextmenu', event => event.preventDefault());

// =============================================
// TYPED.JS — nama & keahlian
// =============================================
new Typed("#typed-name", {
    strings: ["Fajar Aji Kusuma"],
    typeSpeed: 100,
    backSpeed: 50,
    showCursor: false,
    loop: false,
});

new Typed("#typed-skills", {
    strings: [
        "IT Support",
        "Full Stack Web Developer",
        "Network Engineer",
        "Cloud Engineer",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
});

// =============================================
// CERTIFICATE SLIDER — pause on hover
// =============================================
const slider = document.querySelector('.certificates-slider');
const container = document.querySelector('.certificates-outer');

if (container && slider) {
    container.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Gandakan elemen slider agar animasi looping mulus
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("certificatesSlider");
    if (slider) {
        const clone = slider.innerHTML;
        slider.innerHTML += clone;

        // Reset animasi setiap 30s agar tetap sinkron
        setInterval(() => {
            slider.style.animation = "none";
            void slider.offsetWidth; // trigger reflow
            slider.style.animation = "scroll 30s linear infinite";
        }, 30000);
    }
});
