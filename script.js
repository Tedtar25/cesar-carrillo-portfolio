const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const modal = document.querySelector("#info-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");

if (window.lucide) {
  window.lucide.createIcons();
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const openModal = (title, body) => {
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelector('[data-modal="petradar"]')?.addEventListener("click", () => {
  openModal(
    "Endpoints PetRadar API",
    `<p>Endpoints públicos para probar el backend desde navegador o Postman.</p>
    <pre><code>GET  https://pet-radar-api-7we6.onrender.com/health
GET  https://pet-radar-api-7we6.onrender.com/lost-pets
POST https://pet-radar-api-7we6.onrender.com/lost-pets

Body JSON:
{
  "name": "César Carrillo",
  "latitude": 45.165,
  "longitude": -101.684
}</code></pre>`
  );
});

document.querySelector('[data-modal="bubbas"]')?.addEventListener("click", () => {
  openModal(
    "Rutas RestAPI-Bubbas",
    `<p>API backend desplegada en Render. Para una vista rápida con datos guardados, usa la ruta de productos.</p>
    <pre><code>Base URL:
https://restapi-bubbas.onrender.com/

GET  /health
GET  /v1/usuarios
GET  /v1/productos
GET  /v1/pedidos
GET  /v1/detalles
GET  /v1/detalles/pedido/:id_pedido
POST /v1/pedidos/completo</code></pre>`
  );
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    openModal(
      item.dataset.galleryTitle,
      `<p>${item.dataset.galleryText}</p>
      <img src="${item.dataset.galleryImage}" alt="${item.dataset.galleryTitle}" class="modal-image">`
    );
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

document.querySelector(".copy-email")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const email = button.dataset.email;
  const originalText = button.innerHTML;

  try {
    await navigator.clipboard.writeText(email);
    button.innerHTML = '<i data-lucide="check"></i> Email copiado';
  } catch {
    button.innerHTML = '<i data-lucide="mail"></i> cesar.carrillo69@hotmail.com';
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    button.innerHTML = originalText;
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 2200);
});
