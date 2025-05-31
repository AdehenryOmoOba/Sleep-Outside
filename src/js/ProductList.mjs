import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list;
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
    return list.length;
  }

  sortAndRender(criteria) {
    let sortedList = [...this.products];

    switch (criteria) {
      case "name-asc":
        sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        sortedList.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      default:
        sortedList = [...this.products];
    }

    this.renderList(sortedList);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
