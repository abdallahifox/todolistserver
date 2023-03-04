const express = require('express')

const router = express.Router()

const todosControllers = require('./../controllers/todosController')

router.get('/', todosControllers.getAllTodos)
      .post('/', todosControllers.createTodo)
      .put('/', todosControllers.updateTodo)
      .delete('/', todosControllers.deleteTodo)



module.exports= router