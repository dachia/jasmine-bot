import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config.mjs";

export async function connectToDb(uri) {
  let client
  try {
    client= new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    // Ensures that the client will close when you finish/error
    await client?.close();
    throw e;
  }
  return client;
}

export async function disconnectFromDb(client) {
  await client?.close();
  console.log("Closed the connection to MongoDB");
}