const mongoose = require('mongoose')


const todosSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    completed:{
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('todos', todosSchema)