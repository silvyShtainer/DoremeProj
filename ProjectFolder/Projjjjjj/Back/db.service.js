const MongoClient = require('mongodb').MongoClient

const config = require('./config')

module.exports = {
	getCollection,
}

var dbConn = null

async function getCollection(collectionName) {
	try {
		const db = await connect()
		const collection = await db.collection(collectionName)
		return collection
	} catch (err) {
		console.log('Failed to get Mongo collection', err)
		throw err
	}
}

async function connect() {
	if (dbConn) return dbConn
	try {
		const client = await MongoClient.connect(config.dbURL)
		const db = client.db(config.dbName)
		dbConn = db
		return db
	} catch (err) {
		console.log('Cannot Connect to DB', err)
		throw err
	}
}
