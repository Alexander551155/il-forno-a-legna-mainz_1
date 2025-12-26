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

// Hero slideshow (wechselnde Bilder, weniger Text, mehr Stimmung)
const heroImageEl = document.getElementById("heroFrame");
const heroSlideBadge = document.getElementById("heroSlideBadge");
const heroSlides = [
  { src: "./assets/10.png", label: "Holzofen live" },
  { src: "./assets/6.png", label: "Teig & Flammen" },
  { src: "./assets/4.png", label: "Gastraum & Steinofen" },
  { src: "./assets/8.png", label: "Theke & Ambiente" },
];
let heroSlideIdx = 0;

function setHeroSlide(idx) {
  const slide = heroSlides[idx % heroSlides.length];
  if (!slide || !heroImageEl) return;
  heroImageEl.style.backgroundImage = `url(\"${slide.src}\")`;
  if (heroSlideBadge) heroSlideBadge.textContent = slide.label;
  heroSlideIdx = idx % heroSlides.length;
}

if (heroSlides.length && heroImageEl) {
  setHeroSlide(0);
  setInterval(() => setHeroSlide(heroSlideIdx + 1), 5200);
}

// Öffnungszeiten-Indikator (clientseitig, falls keine echten Zeiten hinterlegt sind)
const openingStatusEl = document.getElementById("openingStatus");
// Beispielhafte Öffnungszeiten (kannst du anpassen)
const openingHours = {
  0: null, // Sonntag
  1: { open: "11:30", close: "22:00" },
  2: { open: "11:30", close: "22:00" },
  3: { open: "11:30", close: "22:00" },
  4: { open: "11:30", close: "22:00" },
  5: { open: "11:30", close: "23:00" },
  6: { open: "12:00", close: "23:00" },
};

function parseTimeToDate(timeStr, baseDate) {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date(baseDate);
  d.setHours(h, m, 0, 0);
  return d;
}

function isOpenNow() {
  const now = new Date();
  const today = openingHours[now.getDay()];
  if (!today) return { open: false, today };

  const openDate = parseTimeToDate(today.open, now);
  const closeDate = parseTimeToDate(today.close, now);

  const open = now >= openDate && now <= closeDate;
  return { open, today };
}

function formatTodayRange(today) {
  if (!today) return "Heute geschlossen";
  return `Heute: ${today.open} – ${today.close} Uhr`;
}

function renderOpeningStatus() {
  if (!openingStatusEl) return;
  const { open, today } = isOpenNow();
  const range = formatTodayRange(today);
  const label = open ? "Geöffnet" : "Geschlossen";
  openingStatusEl.dataset.state = open ? "open" : "closed";
  openingStatusEl.innerHTML = `
    <span class="hero__statusDot" aria-hidden="true"></span>
    <span>${label}</span>
    <span class="muted">${range}</span>
  `;
}

renderOpeningStatus();

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
