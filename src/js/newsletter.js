document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterFormElement");
  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (email) {
        localStorage.setItem("newsletter-email", email);
        message.textContent = "Thanks for subscribing!";
        message.classList.remove("hidden");
        form.reset();
      }
    });
  }
});
