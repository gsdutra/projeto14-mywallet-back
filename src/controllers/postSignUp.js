import bcrypt from 'bcrypt'
import db from '../db.js'
import joi from 'joi'
import { stripHtml } from 'string-strip-html'

export async function postSignUp(req, res){
	try {
		const userSchema = joi.object({
			username: joi.string().required(),
			  email: joi.string().email().required(),
			password: joi.string().required(),
		})
	
		const userCredentials = req.body;
	
		const validation = userSchema.validate(userCredentials, { abortEarly: true })
	
		if (validation.error){
			return res.status(422).send(validation.error.details)
		}
	
		userCredentials.username = stripHtml(userCredentials.username).result.trim();
		userCredentials.email = stripHtml(userCredentials.email).result.trim();
	
		const usernameAlreadyExists = await db.collection("users").findOne({username: userCredentials.username})
	
		const emailAlreadyExists = await db.collection("users").findOne({email: userCredentials.email})
	
		if (!usernameAlreadyExists && !emailAlreadyExists){
	
			await db.collection("users").insertOne(userCredentials)
	
			return res.status(201).send(await db.collection("users").find().toArray())
		}else{
			return res.status(409).send("Usuário ou e-mail já cadastrados")
		}
	} catch {
		res.sendStatus(500)
	}
}