
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");

    } else {

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});


/* Load saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    const icon = themeToggle.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        `Thank you ${name}! Your message has been received.`
    );

    contactForm.reset();

});


/* =========================================
   CERTIFICATE MODAL
========================================= */

const certModal = document.getElementById("cert-modal");
const certModalImage = document.getElementById("cert-modal-image");
const certModalPdf = document.getElementById("cert-modal-pdf");
const certModalClose = document.getElementById("cert-modal-close");

document.querySelectorAll(".cert-card").forEach(card => {

    card.addEventListener("click", () => {

        const pdfPath = card.getAttribute("data-pdf");
        const pdfType = card.getAttribute("data-type");

        certModal.classList.add("active");

        if (pdfType === "image") {

            certModalImage.src = pdfPath;
            certModalImage.style.display = "block";
            certModalPdf.style.display = "none";

        } else if (pdfType === "pdf") {

            certModalPdf.src = pdfPath;
            certModalPdf.style.display = "block";
            certModalImage.style.display = "none";

        }

    });

});

document.querySelectorAll(".cert-view").forEach(viewBtn => {

    viewBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        const card = viewBtn.closest(".cert-card");
        const pdfPath = card.getAttribute("data-pdf");
        const pdfType = card.getAttribute("data-type");

        certModal.classList.add("active");

        if (pdfType === "image") {

            certModalImage.src = pdfPath;
            certModalImage.style.display = "block";
            certModalPdf.style.display = "none";

        } else if (pdfType === "pdf") {

            certModalPdf.src = pdfPath;
            certModalPdf.style.display = "block";
            certModalImage.style.display = "none";

        }

    });

});

document.querySelectorAll(".cert-download").forEach(downloadBtn => {

    downloadBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        const card = downloadBtn.closest(".cert-card");
        const pdfPath = card.getAttribute("data-pdf");

        const link = document.createElement("a");
        link.href = pdfPath;
        link.download = pdfPath.split("/").pop();
        link.click();

    });

});

certModalClose.addEventListener("click", () => {

    certModal.classList.remove("active");

    certModalImage.style.display = "none";
    certModalPdf.style.display = "none";

});

certModal.addEventListener("click", (event) => {

    if (event.target === certModal) {

        certModal.classList.remove("active");

        certModalImage.style.display = "none";
        certModalPdf.style.display = "none";

    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealSelectors = [
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".cert-card",
    ".hero .hero-content",
    ".hero-card",
    ".section-title",
    ".resume-section",
    ".about-image",
    ".hero-buttons .btn",
    ".social-links a",
    ".section-description",
    ".contact-text",
    ".contact-form"
].join(", ");

const revealElements = document.querySelectorAll(revealSelectors);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 10) * 80}ms`;
    observer.observe(el);
});

