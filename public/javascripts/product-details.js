document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.querySelector("input[name='quantity']");
  const totalPriceInput = document.querySelector("input[name='totalAmount']");
  const productPrice =
    parseFloat(document.getElementById("productPrice").dataset.price) || 0;
  const shippingFee = 3.0;

  quantityInput.addEventListener("input", () => {
    let quantity = parseInt(quantityInput.value) || 1;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
    totalPriceInput.value = (productPrice * quantity + shippingFee).toFixed(2);
  });
});
