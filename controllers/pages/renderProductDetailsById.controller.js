import { fetchProducts } from "../products/fetchProduct.controller.js";

export const renderProductDetailsPageById = async (req, res) => {
  try {
    const products = await fetchProducts();
    const product = products.find(
      (p) => String(p._id) === String(req.params.id) // Compare as strings
    );

    if (!product) return res.status(404).send("Product not found");

    res.render("product-details", { user: req.user, product });
  } catch (error) {
    console.error("Error loading product details:", error);
    res.status(500).send("Error loading product details");
  }
};
