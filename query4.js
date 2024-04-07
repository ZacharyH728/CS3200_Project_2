const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.DATABASE_URL);


//Finds an invoice from a random user that is marked as Not Started and updates it to Started
client.connect()
    .then(async () => {
        const db = client.db('Project2');

        const invoices = db.collection('invoices');
        const users = await db.collection('users').find({}).toArray();

        const randomUser = users[Math.floor(Math.random() * users.length)]

        const results = await invoices.updateOne(
            {
                "user_id": randomUser['_id'],
                "invoice_status": "Not Started"
            },
            {
                $set: { "invoice_status": "Started" }
            }
        );

        console.log(`Updated ${randomUser['first_name']} ${randomUser['last_name']}'s invoice from Not Started to Started`)

        client.close();
    })
    .catch(e => console.log(e.message));