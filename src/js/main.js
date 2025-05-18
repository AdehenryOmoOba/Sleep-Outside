import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cart.js";
import { getLocalStorage } from "./utils.mjs";

const listElement = document.querySelector(".product-list");

const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();

// Update cart count on page load
const cartItems = getLocalStorage("so-cart");
updateCartCount(
  cartItems ? (Array.isArray(cartItems) ? cartItems.length : 1) : 0,
);
