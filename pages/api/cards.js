const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

async function addCard(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        let newCard = JSON.parse(req.body)
        await db.collection('cards').insertOne(newCard);
        const user = await db.collection('cards').findOne({createdAt: newCard.createdAt})
        // return a message
        return res.json({
            user: {user},
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        

        case 'POST': {
            return addCard(req, res);
        }

    
    }
}


