/* ============================================================
   Savor — simple food picker logic
   ============================================================ */

const menu = [
  {
    name: "Truffle Mushroom Ramen",
    description:
      "Slow-simmered miso broth, springy noodles, woodland mushrooms and a whisper of black truffle oil.",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    alt: "A steaming bowl of ramen with mushrooms and greens"
  },
  {
    name: "Smoky Double Burger",
    description:
      "Two smashed beef patties, melted aged cheddar, pickled onions and maple-smoked sauce on brioche.",
    price: 14.0,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    alt: "A tall double cheeseburger with melted cheese"
  },
  {
    name: "Margherita, Wood-Fired",
    description:
      "Blistered sourdough crust, San Marzano tomatoes, creamy fior di latte and fresh basil.",
    price: 13.5,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    alt: "A wood-fired margherita pizza with fresh basil"
  },
  {
    name: "Baja Fish Tacos",
    description:
      "Crisp beer-battered cod, charred corn salsa, lime crema and cabbage in warm corn tortillas.",
    price: 12.0,
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    alt: "Three fish tacos topped with slaw and lime"
  },
  {
    name: "Burnt Basque Cheesecake",
    description:
      "Caramelised on top, impossibly custardy in the middle, served with a spoon of crème fraîche.",
    price: 9.0,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    alt: "A slice of burnt Basque cheesecake on a plate"
  }
];

/* ---------- Element references ---------- */

const card = document.getElementById("foodCard");
const imageEl = document.getElementById("foodImage");
const nameEl = document.getElementById("foodName");
const descEl = document.getElementById("foodDesc");
const priceEl = document.getElementById("foodPrice");
const randomBtn = document.getElementById("randomBtn");
const yearEl = document.getElementById("year");

/* ---------- State ---------- */

let currentIndex = 0;
let isAnimating = false;

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/* ---------- Rendering ---------- */

function renderDish(index) {
  const dish = menu[index];
  currentIndex = index;

  imageEl.src = dish.image;
  imageEl.alt = dish.alt;
  nameEl.textContent = dish.name;
  descEl.textContent = dish.description;
  priceEl.textContent = formatPrice(dish.price);

  card.classList.remove("is-swapping");
  // Force a reflow so the animation restarts on every pick.
  void card.offsetWidth;
  card.classList.add("is-swapping");
}

function pickRandomDish() {
  if (isAnimating) return;
  isAnimating = true;

  // Never repeat the dish that is already on screen.
  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * menu.length);
  }

  renderDish(nextIndex);

  randomBtn.classList.add("spin");
  window.setTimeout(() => randomBtn.classList.remove("spin"), 500);

  window.setTimeout(() => {
    card.classList.remove("is-swapping");
    isAnimating = false;
  }, 650);
}

/* ---------- Image preloading ---------- */

function preloadImages() {
  menu.forEach((dish) => {
    const img = new Image();
    img.src = dish.image;
  });
}

/* ---------- Init ---------- */

function init() {
  yearEl.textContent = new Date().getFullYear();

  randomBtn.addEventListener("click", pickRandomDish);

  // Press "R" anywhere to shuffle, unless typing in a field.
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.matches("input, textarea, select") || target.isContentEditable);

    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      pickRandomDish();
    }
  });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preloadImages, { timeout: 2500 });
  } else {
    window.setTimeout(preloadImages, 1200);
  }
}

init();
