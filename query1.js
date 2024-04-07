const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.DATABASE_URL);


//This query finds all invoices that the status "Not Started" counts how many invoices there are and adds up all the costs
client.connect()
    .then(async () => {
        const db = client.db('Project2');

        const invoices = db.collection('invoices');

        const results = await invoices.aggregate([
            {
                $match: {
                    "invoice_status": "Not Started"
                }
            },
            {
                $group: {
                    _id: null,
                    totalUnpaid: { $sum: "$invoice_cost" },
                    count: { $sum: 1 }
                }
            },
        ]).toArray();

        console.log(`${results[0]['count']} invoices were unpaid, totalling to $${results[0]['totalUnpaid']}`)
        client.close();
    })
    .catch(e => console.log(e.message));