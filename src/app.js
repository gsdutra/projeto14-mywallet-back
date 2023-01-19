import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000

// conectando ao banco
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient.connect().then(() => {
	db = mongoClient.db();
});

app.get("/", (req, res) => {
	res.sendStatus(200)
});


app.listen(PORT, ()=>console.log("Server listening on port "+PORT));