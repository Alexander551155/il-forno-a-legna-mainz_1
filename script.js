// Mobile menu
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

function setBurgerExpanded(expanded) {
  burger?.setAttribute("aria-expanded", expanded ? "true" : "false");
}

burger?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  mobileNav.style.display = isOpen ? "block" : "none";
  setBurgerExpanded(isOpen);
});

mobileNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    mobileNav.style.display = "none";
    setBurgerExpanded(false);
  });
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Lightbox (Gallery)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-lightbox]").forEach((btn) => {
  btn.addEventListener("click", () => openLightbox(btn.getAttribute("data-lightbox")));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Optional: Text-Menu render (du kannst es benutzen oder ignorieren)
const menuData = [
  {
    title: "Pizza Rossa",
    note: "Tomatenbasis",
    items: [
      { name: "Margherita", desc: "Tomate, Mozzarella, Basilikum", price: "—" },
      { name: "Salami", desc: "Tomate, Mozzarella, Salami", price: "—" },
    ],
  },
  {
    title: "Pizza Bianca",
    note: "ohne Tomate",
    items: [
      { name: "Bianca", desc: "Mozzarella, Ricotta, Kräuter", price: "—" },
    ],
  },
  {
    title: "Dessert",
    note: "",
    items: [
      { name: "Tiramisu", desc: "Hausgemacht", price: "—" },
    ],
  },
];

function renderMenu() {
  const root = document.getElementById("menuList");
  if (!root) return;

  // Wenn du lieber nur Menü-Bilder zeigst: einfach menuData leer machen:
  // const menuData = [];

  if (!menuData.length) {
    root.innerHTML = `<div class="muted">Text-Menü ist deaktiviert. (Nur Menü-Bilder aktiv.)</div>`;
    return;
  }

  root.innerHTML = menuData
    .map((cat) => {
      const itemsHtml = cat.items
        .map(
          (it) => `
          <div class="menuItem">
            <div>
              <div class="menuItem__name">${it.name}</div>
              ${it.desc ? `<span class="menuItem__desc">${it.desc}</span>` : ""}
            </div>
            <div class="menuItem__price">${it.price || ""}</div>
          </div>
        `
        )
        .join("");

      return `
        <section class="menuCategory">
          <div class="menuCategory__head">
            <strong>${cat.title}</strong>
            <span>${cat.note || ""}</span>
          </div>
          <div class="menuItems">${itemsHtml}</div>
        </section>
      `;
    })
    .join("");
}

renderMenu();
