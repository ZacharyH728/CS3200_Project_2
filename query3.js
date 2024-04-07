const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.DATABASE_URL);

//Finds and returns how many invoices a specfic user has
client.connect()
    .then(async () => {
        const db = client.db('Project2');

        const invoices = db.collection('invoices');
        const users = await db.collection('users').find({}).toArray();

        const randomUser = users[Math.floor(Math.random() * users.length)]

        const results = await invoices.countDocuments({
            "user_id": randomUser['_id']
        });

        console.log(`${randomUser['first_name']} ${randomUser['last_name']} has ${results} invoices`)

        client.close();
    })
    .catch(e => console.log(e.message));