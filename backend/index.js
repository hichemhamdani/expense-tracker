require('dotenv').config()
const PORT = process.env.PORT

const cors = require('cors')

const {readdirSync} = require('fs')


const express = require('express')
const { db } = require('./db/db')
const app = express()

//models


//Middelwares
app.use(express.json())
app.use(cors())

//Routes
const transactionRoutes = require('./routes/transactions');


app.use('/api', transactionRoutes);


app.listen(PORT, ()=>{
    db()
    console.log(`Listening on port ${PORT}`)
})
