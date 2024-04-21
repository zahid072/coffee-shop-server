const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("coffee shop server is running...");
});

const uri =
  "mongodb+srv://coffeeshop0:aVomGSIkzRCLxdeK@cluster0.pvtbyiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  const database = client.db("coffeesDB");
  const coffeeCollection = database.collection("coffee");

  app.post("/coffee", async (req, res) => {
    const coffee = req.body;
    const result = await coffeeCollection.insertOne(coffee);
    res.send(result);
  });
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log(`coffee server is running on port: ${port}`);
});
