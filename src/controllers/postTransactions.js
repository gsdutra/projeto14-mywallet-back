import joi from 'joi'
import db from '../db.js'
export async function postTransactions(req, res){
	try {
		const transactionSchema = joi.object({
			ammount: joi.number().required(),
			type: joi.string().required(),
			note: joi.string().required()
		})

		const userId = res.locals.userId

		const transaction = req.body

		const validation = transactionSchema.validate(transaction, { abortEarly: true })

		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		if (transaction.type !== "received" && transaction.type !== "spent"){
			return res.status(422).send("Invalid type. Must be 'received' or 'spent'")
		}

		const transactionWithUser = {...transaction, userId}

		await db.collection("transactions").insertOne(transactionWithUser)

		res.sendStatus(201)

	} catch {
		res.sendStatus(500)
	}
}