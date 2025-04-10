import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.MONGODBURL;
const client = new MongoClient(uri);

await client.connect(); 
const database = client.db(process.env.DBNAME);
const productsCollection = database.collection(process.env.COLLECTIONNAME);

export async function fetchProducts() {
  try {
    const products = await productsCollection.find({}).toArray();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
