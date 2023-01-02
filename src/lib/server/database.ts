import { MongoClient } from "mongodb"
import { DB_URI } from '$env/static/private';


const client = new MongoClient(DB_URI)
await client.connect()
const collection = await client.db('shrinkly').collection("links")
await collection.createIndex({"slug": 1});
await collection.createIndex({"expiresAt": 1}, {expireAfterSeconds: 0});
export default collection