// =========================
// Scroll Animation
// =========================

const animatedElements = document.querySelectorAll(
    "section, .project-card, .skill-group, .contact-item, .timeline-item"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

animatedElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});


// =========================
// Navigation
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const homeLink = document.querySelector('.nav-links a[href="#"]');

const navDropdownButton = document.querySelector(
    ".nav-dropdown-button"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                if (navDropdownButton) {
                    navDropdownButton.classList.remove("active");
                }

                const currentLink = document.querySelector(
                    '.nav-links a[href="#' + currentId + '"]'
                );

                if (currentLink) {
                    currentLink.classList.add("active");
                }

                const dropdownLink = document.querySelector(
                    '.nav-dropdown-menu a[href="#' + currentId + '"]'
                );

                if (dropdownLink && navDropdownButton) {
                    navDropdownButton.classList.add("active");
                }
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


window.addEventListener("scroll", () => {

    if (window.scrollY < 200) {

        navLinks.forEach((link) => {
            link.classList.remove("active");
        });

        if (homeLink) {
            homeLink.classList.add("active");
        }

        if (navDropdownButton) {
            navDropdownButton.classList.remove("active");
        }
    }

});


// =========================
// Language Switch
// =========================

const languageButtons = document.querySelectorAll(".language-btn");

const englishElements = document.querySelectorAll(".lang-en");
const chineseElements = document.querySelectorAll(".lang-zh");


function setLanguage(language) {

    // =========================
    // English
    // =========================

    if (language === "en") {

        englishElements.forEach((element) => {
            element.style.display = "";
        });

        chineseElements.forEach((element) => {
            element.style.display = "none";
        });

    }


    // =========================
    // Chinese
    // =========================

    if (language === "zh") {

        englishElements.forEach((element) => {
            element.style.display = "none";
        });

        chineseElements.forEach((element) => {
            element.style.display = "";
        });

    }


    // =========================
    // Update Language Button
    // =========================

    languageButtons.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });


    // =========================
    // Update HTML Language
    // =========================

    document.documentElement.lang =
        language === "zh" ? "zh-CN" : "en";


    // =========================
    // Update Page Title & Description
    // =========================

    const metaDescription = document.querySelector('meta[name="description"]');

    if (language === "en") {

        document.title =
            "Li Lu | Machining Development Engineer | CNC & Advanced Manufacturing";

        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "Li Lu is a Machining Development Engineer at GE Vernova (AMRT) in Singapore with 10+ years of experience in CNC machining, machining process development, CNC programming, equipment integration and gas turbine repair technology."
            );
        }

    } else {

        document.title =
            "李路 | 机加工开发工程师 | CNC 与先进制造";

        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "李路，GE Vernova（AMRT）机加工开发工程师，常驻新加坡，拥有10年以上CNC加工、加工工艺开发、CNC编程、设备集成与燃汽轮机维修技术经验。"
            );
        }

    }

}


// =========================
// Language Button Click
// =========================

languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedLanguage =
            button.dataset.lang;

        setLanguage(selectedLanguage);

    });

});


// =========================
// Default Language
// =========================

setLanguage("en");

// =========================
// Theme Toggle
// =========================

const themeToggle = document.getElementById("themeToggle");

const systemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
);


// Check saved theme
const savedTheme = localStorage.getItem("theme");


// Apply theme
function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    }

}


// Initial theme
if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme(
        systemTheme.matches ? "dark" : "light"
    );

}


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isDark =
            document.body.classList.contains("dark-mode");

        const newTheme =
            isDark ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem(
            "theme",
            newTheme
        );

    });

}


// Follow system theme when no manual selection
systemTheme.addEventListener("change", (event) => {

    if (!localStorage.getItem("theme")) {

        applyTheme(
            event.matches ? "dark" : "light"
        );

    }

});