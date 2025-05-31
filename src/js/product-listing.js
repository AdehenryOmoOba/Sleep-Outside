import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

loadHeaderFooter().then(() => {
  listing.init().then((count) => {
    renderBreadcrumb(category, count);
  });
  document
    .querySelector("#sort-select")
    .addEventListener("change", (e) => listing.sortAndRender(e.target.value));
});

function renderBreadcrumb(categoryName, count = null) {
  const breadcrumb = document.querySelector("#breadcrumb");
  if (!breadcrumb) return;

  const capitalized =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

  breadcrumb.innerHTML = "";

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.classList.add("breadcrumb-link");
  homeLink.textContent = "Home";

  const arrow1 = document.createTextNode(" → ");

  const categorySpan = document.createElement("a");
  categorySpan.textContent = `${capitalized}`;

  const arrow2 = document.createTextNode(" → ");
  const countSpan = document.createElement("span");
  countSpan.textContent = `(${count} items)`;

  breadcrumb.appendChild(homeLink);
  breadcrumb.appendChild(arrow1);
  breadcrumb.appendChild(categorySpan);
  breadcrumb.appendChild(arrow2);
  breadcrumb.appendChild(countSpan);
}
