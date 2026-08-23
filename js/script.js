const mobileMenuButton = document.getElementById("mobileMenuButton");
const navMenu = document.getElementById("navMenu");

if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        mobileMenuButton.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-menu a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            mobileMenuButton.textContent = "☰";
        });
    });
}

const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector("span");
        if (!answer) return;
        const isOpen = answer.style.display === "block";
        answer.style.display = isOpen ? "none" : "block";
        if (icon) icon.textContent = isOpen ? "+" : "−";
    });
});

const languageSwitch = document.getElementById("languageSwitch");
if (languageSwitch) {
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
    languageSwitch.classList.toggle("is-en", isEnglish);
    languageSwitch.setAttribute("aria-pressed", isEnglish ? "true" : "false");

    languageSwitch.addEventListener("click", function () {
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const languageRoutes = {
            "index.html": "index-en.html",
            "index-en.html": "index.html",
            "about.html": "about-en.html",
            "about-en.html": "about.html"
        };
        const targetFile = languageRoutes[currentFile];
        if (!targetFile) return;
        window.location.href = targetFile + window.location.hash;
    });
}


/* =====================================================
   UZUN LİSTELER / DEVAMINI OKU
===================================================== */

document.querySelectorAll("[data-collapsible-list]").forEach(function (list) {
    const items = Array.from(list.children).filter(function (item) {
        return item.tagName === "ARTICLE";
    });

    const visibleCount = Number.parseInt(
        list.dataset.visibleCount || "8",
        10
    );

    if (!Number.isFinite(visibleCount) || items.length <= visibleCount) {
        return;
    }

    const moreLabel = list.dataset.moreLabel || "Devamını Oku";
    const lessLabel = list.dataset.lessLabel || "Daha Az Göster";
    const hiddenItems = items.slice(visibleCount);

    hiddenItems.forEach(function (item) {
        item.classList.add("collapsible-hidden");
    });

    const buttonWrap = document.createElement("div");
    buttonWrap.className = "collapsible-toggle-wrap";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "content-toggle-button";
    button.setAttribute("aria-expanded", "false");

    const label = document.createElement("span");
    label.className = "toggle-label";
    label.textContent = moreLabel;

    const arrow = document.createElement("span");
    arrow.className = "toggle-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "⌄";

    button.appendChild(label);
    button.appendChild(arrow);
    buttonWrap.appendChild(button);

    list.insertAdjacentElement("afterend", buttonWrap);

    button.addEventListener("click", function () {
        const isOpen = button.classList.toggle("is-open");

        hiddenItems.forEach(function (item) {
            item.classList.toggle("collapsible-hidden", !isOpen);
        });

        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        label.textContent = isOpen ? lessLabel : moreLabel;
    });
});
