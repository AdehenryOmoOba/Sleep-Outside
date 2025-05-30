// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const breadcrumbTemplate = await loadTemplate("/partials/breadcrumb.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  const breadcrumbElement = document.querySelector("#breadcrumb-wrapper");

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }

  if (breadcrumbElement) {
    renderWithTemplate(breadcrumbTemplate, breadcrumbElement);
  }
}

export function renderBreadcrumbTrail(links = []) {
  const breadcrumb = document.querySelector("#breadcrumb");
  if (!breadcrumb) return;

  breadcrumb.innerHTML = "";

  links.forEach((link, index) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.classList.add("breadcrumb-link");

    breadcrumb.appendChild(anchor);

    if (index < links.length - 1) {
      const separator = document.createTextNode(" → ");
      breadcrumb.appendChild(separator);
    }
  });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
