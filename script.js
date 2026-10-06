"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuToggle && navigation) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        navigation.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
        navigation.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeMenu();
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".project-preview").forEach((image) => {
    const showImage = () => {
        if (image.naturalWidth > 1 && image.naturalHeight > 1) {
            image.closest(".project-preview-frame")?.classList.add("has-image");
        }
    };
    image.addEventListener("load", showImage, { once: true });

    if (image.complete && image.naturalWidth > 1) showImage();
});

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
    const feedback = document.querySelector("#form-feedback");
    const fields = [
        { input: contactForm.elements.namedItem("nom"), errorId: "nom-error", message: "Veuillez saisir un nom de 2 à 100 caractères." },
        { input: contactForm.elements.namedItem("email"), errorId: "email-error", message: "Veuillez saisir une adresse email valide." },
        { input: contactForm.elements.namedItem("sujet"), errorId: "sujet-error", message: "Veuillez saisir un sujet de 3 à 120 caractères." },
        { input: contactForm.elements.namedItem("message"), errorId: "message-error", message: "Veuillez saisir un message de 10 à 2 000 caractères." }
    ];

    const validateField = ({ input, errorId, message }) => {
        const error = document.getElementById(errorId);
        const valid = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement
            ? input.checkValidity() && input.value.trim().length >= input.minLength
            : false;

        if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) || !error) {
            return false;
        }

        input.setAttribute("aria-invalid", String(!valid));
        error.textContent = valid ? "" : message;
        return valid;
    };

    fields.forEach((field) => {
        if (field.input instanceof HTMLInputElement || field.input instanceof HTMLTextAreaElement) {
            field.input.addEventListener("input", () => {
                validateField(field);
                if (feedback) feedback.textContent = "";
            });
        }
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!(feedback instanceof HTMLElement)) return;

        feedback.classList.remove("is-error");
        feedback.textContent = "";
        const isValid = fields.map(validateField).every(Boolean);

        if (!isValid) {
            feedback.classList.add("is-error");
            feedback.textContent = "Vérifiez les champs indiqués avant de continuer.";
            const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
            return;
        }

        const name = contactForm.elements.namedItem("nom");
        const email = contactForm.elements.namedItem("email");
        const subject = contactForm.elements.namedItem("sujet");
        const message = contactForm.elements.namedItem("message");
        if (!(name instanceof HTMLInputElement) || !(email instanceof HTMLInputElement)
            || !(subject instanceof HTMLInputElement) || !(message instanceof HTMLTextAreaElement)) {
            feedback.classList.add("is-error");
            feedback.textContent = "Le formulaire n’a pas pu être préparé. Veuillez réessayer.";
            return;
        }

        const whatsappMessage = encodeURIComponent(
            `Bonjour Amon,\n\n${message.value.trim()}\n\nNom : ${name.value.trim()}\nEmail : ${email.value.trim()}\nSujet : ${subject.value.trim()}`
        );
        feedback.textContent = "WhatsApp va s’ouvrir avec ton message. Relis-le puis appuie sur Envoyer dans WhatsApp.";
        window.location.href = `https://wa.me/225575761107?text=${whatsappMessage}`;
    });
}
