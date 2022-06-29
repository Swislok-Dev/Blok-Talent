const express = require('express')
require('dotenv').config()
require('colors')
const port = process.env.PORT


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.listen(port, () => console.log(`Server started on port ${port}`.magenta))