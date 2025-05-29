import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Only render cart contents if we're on the cart page
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  let cartItems = getLocalStorage("so-cart");

  // Ensure cartItems is always an array
  if (!cartItems) {
    cartItems = [];
  } else if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Filter out invalid items
  const validItems = cartItems.filter(
    (item) =>
      item &&
      (item.Image || (item.Images && item.Images.PrimaryMedium)) &&
      item.Name &&
      item.Colors &&
      item.Colors[0] &&
      item.Colors[0].ColorName &&
      item.FinalPrice,
  );

  const htmlItems = validItems.map((item) => cartItemTemplate(item));
  if (htmlItems.length === 0) {
    productList.innerHTML =
      "<li style='width:100%;text-align:center;padding:2em;'>Your cart is empty.</li>";
  } else {
    productList.innerHTML = htmlItems.join("");
  }

  const total = validItems.reduce(
    (sum, item) => sum + (parseFloat(item.FinalPrice) || 0),
    0
  );
  
  const totalElem = document.getElementById("checkout-summary-total");
  
  if (totalElem) {
    totalElem.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Update cart count in header
  updateCartCount(validItems.length);
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
    if (!cartIcon) return; // Don't try to create badge if cart icon doesn't exist
    badge = document.createElement("span");
    badge.className = "cart-count";
    cartIcon.appendChild(badge);
  }
  badge.textContent = count > 0 ? count : "";
}

// Only render cart contents if we're on the cart page
if (window.location.pathname.includes("/cart/")) {
  renderCartContents();
} else {
  // Just update the cart count on other pages
  const cartItems = getLocalStorage("so-cart");
  const count = cartItems
    ? Array.isArray(cartItems)
      ? cartItems.length
      : 1
    : 0;
  updateCartCount(count);
}

export { updateCartCount };
