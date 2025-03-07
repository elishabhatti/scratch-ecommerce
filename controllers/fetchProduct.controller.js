
export async function fetchProducts() {
    try {
      return await productsCollection.find({}).toArray();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }