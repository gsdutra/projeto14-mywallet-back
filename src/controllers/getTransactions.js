import joi from 'joi'
import db from '../db.js'
import { ObjectID } from 'bson'

export async function getTransactions(req, res){
	const userId = res.locals.userId
	const transactions = await db.collection("transactions").find({userId: ObjectID(userId)}).toArray()

	res.status(200).send(transactions)
}