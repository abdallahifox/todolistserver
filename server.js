
// ENV CONFIG
const dotenv = require('dotenv')
dotenv.config()

// import 3rd Party 
const express = require('express')
const app = express()


//Database mongoose
const mongoose = require('mongoose')

const todosRoute = require('./routes/todosRoutes')

// transform Body to JSON middleware
app.use(express.json())

// ROUTEING Middleware
app.use('/api/todos', todosRoute)


// Connected to DB
mongoose.connect(process.env.DATA_BASE_URL).then(()=>{
    console.log('database are connected!!')

    // running the server
    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
})



