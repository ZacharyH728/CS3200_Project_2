
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.DATABASE_URL);


//Finds an invoice from a random project name
client.connect()
    .then(async () => {
        const db = client.db('Project2');

        const invoices = await db.collection('invoices').find({}).toArray();

        const randomProjectName = invoices[Math.floor(Math.random() * invoices.length)]['project'][0]['project_name']

        const results = await db.collection('invoices').find({ "project.project_name": randomProjectName }).toArray();


        console.log(`Found invoice ${results[0]['invoice_title']} with the project name ${randomProjectName}`)

        client.close();
    })
    .catch(e => console.log(e.message));