const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ixkdtuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection


        const etapCollection = client.db('etap-eCommerce-collection').collection('etap-collection');
        const allProducts = client.db('etap-eCommerce-collection').collection('allProducts');

        // Etap-Collection----------
        app.get('/etap-collection', async (req, res) => {
            const query = {};
            const result = await etapCollection.find(query).toArray();
            res.send(result)
        });
        app.get('/etap-collection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await etapCollection.findOne(query);
            res.send(result)
        });

        // All Products Api-----------------------------
        app.get('/products', async (req, res) => {
            const result = await allProducts.find().toArray()
            res.send(result)
        });
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await allProducts.findOne(filter)
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('Etap ecommerce server is running')
});
app.listen(port, () => console.log(`server runing port ${port}`));