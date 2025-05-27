import { updateCartCount } from "./cart.js";
import { getLocalStorage } from "./utils.mjs";

// Update cart count on page load
const cartItems = getLocalStorage("so-cart");
updateCartCount(
  cartItems ? (Array.isArray(cartItems) ? cartItems.length : 1) : 0,
);
