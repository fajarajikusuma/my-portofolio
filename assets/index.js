// =============================================
// THEME TOGGLE (dark / light)
// =============================================
(function () {
    const html = document.documentElement;

    // Ikon untuk setiap tema
    const ICONS = {
        dark: 'fas fa-sun',    // tampilkan matahari saat dark (klik → light)
        light: 'fas fa-moon',   // tampilkan bulan saat light (klik → dark)
    };

    // Ambil preferensi tersimpan, atau ikuti sistem
    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme');
        }
        // Update semua tombol toggle
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) icon.className = ICONS[theme];
        });
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Terapkan tema awal sebelum render (cegah flash)
    applyTheme(getInitialTheme());

    // Pasang event listener setelah DOM siap
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });

        // Ikuti perubahan preferensi sistem secara real-time
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    });
})();
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
            const navToggle = document.getElementById('navToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('menu-open');
                mobileMenu.classList.add('hidden');
                if (navToggle) navToggle.classList.remove('is-open');
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
            const isOpen = navToggle.classList.contains('is-open');
            if (isOpen) {
                // Close
                navToggle.classList.remove('is-open');
                mobileMenu.classList.remove('menu-open');
                mobileMenu.classList.add('hidden');
            } else {
                // Open
                navToggle.classList.add('is-open');
                mobileMenu.classList.remove('hidden');
                // Force reflow then add animation class
                void mobileMenu.offsetWidth;
                mobileMenu.classList.add('menu-open');
            }
        });
    }
});

// =============================================
// ACTIVE NAV LINK — highlight on scroll
// =============================================
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item');
    const navbar = document.querySelector('.navbar-glass');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        // Navbar scrolled state
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active section detection
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
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
// WAVE DIVIDER — CSS animation only, no JS parallax
// (parallax dihapus karena konflik dengan CSS animation
//  dan menyebabkan transform glitch)
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
