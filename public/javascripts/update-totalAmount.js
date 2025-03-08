document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.querySelector("#quantity");
    const totalAmountElement = document.querySelector("#totalAmount");
    const price = parseFloat(quantityInput.dataset.price); // Get the price from the data attribute
  
    function updateTotal() {
      const quantity = parseInt(quantityInput.value) || 1;
      const shippingFee = 3.00;
      const totalAmount = (price * quantity + shippingFee).toFixed(2);
      totalAmountElement.value = totalAmount; // Update the input value
    }
  
    quantityInput.addEventListener("input", updateTotal);
  
    // Initialize total amount on page load
    updateTotal();
  });
  