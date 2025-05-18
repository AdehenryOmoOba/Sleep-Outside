import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const addToCartButton = document.getElementById("addToCart");
const productID = addToCartButton ? addToCartButton.dataset.id : null;

if (productID) {
  const product = new ProductDetails(productID, dataSource);
  product.init();
}
