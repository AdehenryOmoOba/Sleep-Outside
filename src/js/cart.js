import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  // Ensure cartItems is always an array
  if (!cartItems) {
    cartItems = [];
  } else if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate and display total
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.FinalPrice) || 0), 0);
  let totalElem = document.getElementById("cartTotal");
  if (!totalElem) {
    totalElem = document.createElement("div");
    totalElem.id = "cartTotal";
    totalElem.className = "cart-total-centered";
    // Move to the end of main
    document.querySelector("main").appendChild(totalElem);
  }
  totalElem.textContent = `Total: $${total.toFixed(2)}`;

  // Update cart count in header
  updateCartCount(cartItems.length);
}

function cartItemTemplate(item) {
  // Use the correct image property
  const imageUrl =
    item.Images && item.Images.PrimaryMedium
      ? item.Images.PrimaryMedium
      : item.Image;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageUrl}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateCartCount(count) {
  let badge = document.querySelector(".cart-count");
  if (!badge) {
    const cartIcon = document.querySelector(".cart");
    badge = document.createElement("span");
    badge.className = "cart-count";
    cartIcon.appendChild(badge);
  }
  badge.textContent = count > 0 ? count : "";
}

renderCartContents();

export { updateCartCount };
