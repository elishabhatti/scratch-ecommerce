import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1/scratch"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("scratch"); // Replace with your DB name
    const collection = database.collection("products");

    const shoppingBags = [
      {
        title: "Stunning Shopping Bag",
        price: 12.0,
        originalPrice: 15.0,
        image: "/images/shopping-bag-1.jpeg",
      },
      {
        title: "Elegant Tote Bag",
        price: 18.0,
        originalPrice: 22.0,
        image: "/images/shopping-bag-2.jpeg",
      },
      {
        title: "Classic Paper Bag",
        price: 10.0,
        originalPrice: 13.0,
        image: "/images/shopping-bag-3.jpeg",
      },
      {
        title: "Luxury Gift Bag",
        price: 25.0,
        originalPrice: 30.0,
        image: "/images/shopping-bag-4.jpg",
      },
      {
        title: "Eco-Friendly Shopping Bag",
        price: 14.5,
        originalPrice: 18.0,
        image: "/images/shopping-bag-5.png",
      },
      {
        title: "Minimalist Shopper Bag",
        price: 20.0,
        originalPrice: 25.0,
        image: "/images/shopping-bag-6.jpg",
      },
    ];

    const result = await collection.insertMany(shoppingBags);
    console.log(`${result.insertedCount} documents inserted successfully`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();
