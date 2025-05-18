import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cart.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");
    if (!cartItems) {
      cartItems = [];
    } else if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];
    }
    console.log("Adding to cart:", this.product);
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    updateCartCount(cartItems.length);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h3").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector(".product-detail img");
  if (productImage) {
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
  }

  const priceElement = document.querySelector(".product-card__price");
  if (priceElement) {
    priceElement.textContent = `$${product.FinalPrice}`;
  }

  const colorElement = document.querySelector(".product__color");
  if (colorElement) {
    colorElement.textContent = product.Colors[0].ColorName;
  }

  const descElement = document.querySelector(".product__description");
  if (descElement) {
    descElement.innerHTML = product.DescriptionHtmlSimple;
  }

  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.dataset.id = product.Id;
  }
}

