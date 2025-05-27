import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter().then(() => {
  renderBreadcrumb("Product category");
});

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

function renderBreadcrumb(label) {
  const breadcrumb = document.querySelector("#breadcrumb");
  if (breadcrumb) {
    breadcrumb.textContent = label;
  }
}
