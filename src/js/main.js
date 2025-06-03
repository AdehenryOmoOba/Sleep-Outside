import { updateCartCount } from "./cart.js";
import { getLocalStorage } from "./utils.mjs";
import RegisterBanner from "./registerBanner.js";

// Update cart count on page load
const cartItems = getLocalStorage("so-cart");
updateCartCount(
  cartItems ? (Array.isArray(cartItems) ? cartItems.length : 1) : 0,
);

// Initialize registration banner
new RegisterBanner();
