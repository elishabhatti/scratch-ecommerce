import { MongoClient } from "mongodb";


const uri = "mongodb://127.0.0.1/scratch";
const client = new MongoClient(uri);

await client.connect(); 
const database = client.db("scratch");
const productsCollection = database.collection("bags");

export async function fetchProducts() {
    try {
      return await productsCollection.find({}).toArray();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }