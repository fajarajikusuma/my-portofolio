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


