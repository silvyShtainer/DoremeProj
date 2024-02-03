const express = require('express');
const dbService = require('../db.service');

const router = express.Router();

router.post('/addContent', addContent);
router.get('/getContent', getContent);

async function addContent(req, res) {
	try {
		const file = req.body;
		console.log(file);

		const collection = await dbService.getCollection('content');
		await collection.insertOne(file);

		res.status(200).send('it worked!');
	} catch (err) {
		console.log('Failed to Login ' + err);
		res.status(500).send({ err: 'Failed to Login' });
	}
}

async function getContent(req, res) {
	try {
		const collection = await dbService.getCollection('content');
		const allContent = await collection.find().toArray();

		res.json(allContent);
	} catch (err) {
		console.log('Failed to Login ' + err);
		res.status(500).send({ err: 'Failed to Login' });
	}
}

module.exports = { router };
