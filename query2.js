const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.DATABASE_URL);

//Returns how many invoices a user has that are either marked "Completed and Paid" or have a invoice cost greater than 1000
client.connect()
    .then(async () => {
        const db = client.db('Project2');

        const invoices = db.collection('invoices');
        const users = await db.collection('users').find({}).toArray();

        const randomUser = users[Math.floor(Math.random() * users.length)]

        const results = await invoices.find({
            "user_id": randomUser['_id'],
            "$or": [
                { "invoice_status": "Completed and Paid" },
                { "invoice_cost": { "$gt": 1000 } }
            ]
        }).toArray();

        console.log(`The user ${randomUser['first_name']} has ${results.length} invoices marked as Completed and Paid or invoices with a cost greater than 1000`)

        client.close();
    })
    .catch(e => console.log(e.message));