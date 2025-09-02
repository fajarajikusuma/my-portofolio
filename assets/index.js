// fungsi scroll ke atas
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// tampilkan / sembunyikan tombol saat scroll
window.addEventListener("scroll", function () {
    const scrollBtn = document.getElementById("scrollToTopButton");
    if (window.scrollY > 20) { // muncul kalau scroll lebih dari 200px
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

// inisialisasi AOS
AOS.init({ duration: 1000, once: false });

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // tinggi navbar fixed
            const offsetTop = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// cegah agar tidak bisa download gambar, copy, drag and drop, inspect element, view source code, dan mematikan javascript web tidak bisa
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase(); // ubah ke huruf kecil
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

// efek ketik untuk nama
new Typed("#typed-name", {
    strings: ["Fajar Aji Kusuma"], // isi nama
    typeSpeed: 100,
    backSpeed: 50,
    showCursor: false,
    loop: false,
});

// efek ketik untuk keahlian
new Typed("#typed-skills", {
    strings: [
        "Full Stack Web Developer",
        "Network Engineer",
        "Cloud Engineer",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
});

