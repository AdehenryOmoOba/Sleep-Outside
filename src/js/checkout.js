import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document
  .querySelector("#checkout-form input[name='zip']")
  .addEventListener("blur", () => checkout.calculateOrderTotal());

const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  checkout.checkout(form);
});
