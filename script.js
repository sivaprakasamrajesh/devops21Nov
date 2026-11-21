// ===== Menu Data =====
const menuItems = [
  { name: "Paneer Tikka", desc: "Smoky cottage cheese with spices", price: 249, emoji: "🧀", cat: "starter" },
  { name: "Crispy Samosa", desc: "Golden pastry stuffed with potatoes", price: 99, emoji: "🥟", cat: "starter" },
  { name: "Spring Rolls", desc: "Crunchy rolls with veggie filling", price: 149, emoji: "🌯", cat: "starter" },
  { name: "Veg Biryani", desc: "Fragrant basmati rice with saffron", price: 299, emoji: "🍛", cat: "main" },
  { name: "Margherita Pizza", desc: "Classic tomato, mozzarella & basil", price: 349, emoji: "🍕", cat: "main" },
  { name: "Pasta Alfredo", desc: "Creamy white sauce penne pasta", price: 279, emoji: "🍝", cat: "main" },
  { name: "Gourmet Burger", desc: "Juicy patty with fresh veggies", price: 229, emoji: "🍔", cat: "main" },
  { name: "Gulab Jamun", desc: "Soft dumplings in rose syrup", price: 119, emoji: "🍡", cat: "dessert" },
  { name: "Choco Lava Cake", desc: "Warm cake with a molten centre", price: 179, emoji: "🍰", cat: "dessert" },
  { name: "Mango Lassi", desc: "Chilled yoghurt & mango smoothie", price: 109, emoji: "🥭", cat: "drink" },
  { name: "Masala Chai", desc: "Spiced Indian milk tea", price: 59, emoji: "☕", cat: "drink" },
  { name: "Fresh Lemonade", desc: "Zesty, minty & refreshing", price: 89, emoji: "🍋", cat: "drink" },
];

const menuGrid = document.getElementById("menuGrid");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
let cart = 0;

// ===== Render Menu =====
function renderMenu(filter = "all") {
  const items = filter === "all" ? menuItems : menuItems.filter(i => i.cat === filter);
  menuGrid.innerHTML = items.map((item, idx) => `
    <div class="card" style="animation-delay:${idx * 0.07}s">
      <div class="emoji">${item.emoji}</div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="card-footer">
        <span class="price">₹${item.price}</span>
        <button class="add-btn" data-name="${item.name}">+</button>
      </div>
    </div>`).join("");
}
renderMenu();

// ===== Filters =====
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderMenu(btn.dataset.filter);
  });
});

// ===== Add to Cart =====
menuGrid.addEventListener("click", e => {
  if (!e.target.classList.contains("add-btn")) return;
  cart++;
  cartCount.textContent = cart;
  cartBtn.classList.remove("bump");
  void cartBtn.offsetWidth; // restart animation
  cartBtn.classList.add("bump");
  showToast(`✅ ${e.target.dataset.name} added to cart`);
});
cartBtn.addEventListener("click", () => showToast(`🛒 You have ${cart} item(s) in your cart`));

// ===== Toast =====
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== Navbar & Scroll =====
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  topBtn.classList.toggle("show", window.scrollY > 500);
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Mobile Menu =====
const navLinks = document.getElementById("navLinks");
document.getElementById("hamburger").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ===== Reveal on Scroll =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== Counter Animation =====
document.querySelectorAll("[data-count]").forEach(el => {
  const target = +el.dataset.count;
  let current = 0;
  const step = Math.ceil(target / 80);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + "+";
    if (current === target) clearInterval(timer);
  }, 20);
});

// ===== Review Slider =====
const reviews = document.querySelectorAll(".review");
const dotsBox = document.getElementById("dots");
let slide = 0;
reviews.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsBox.appendChild(dot);
});
function goToSlide(i) {
  reviews[slide].classList.remove("active");
  dotsBox.children[slide].classList.remove("active");
  slide = i;
  reviews[slide].classList.add("active");
  dotsBox.children[slide].classList.add("active");
}
setInterval(() => goToSlide((slide + 1) % reviews.length), 4000);

// ===== Booking Form =====
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  showToast("🎉 Table reserved! We'll email you the confirmation.");
  e.target.reset();
});