const todosModel = require('./../models/todosModel')
const asyncHandler = require('express-async-handler')

// @name getAllTodos
// @method GET
// @desc fetch all todos from database

const getAllTodos = asyncHandler( async (req,res) => {
    const allTodos = await todosModel.find({}).lean()
    
    if(allTodos){
        return res.status(200).json({allTodos: allTodos})
    }

    res.status(400).json({massage:'No Todos Are Found!!'})
})


// @name Create TODO
// @method POST
// @desc Create TODO To database

const createTodo = asyncHandler(async (req,res) => {
    const {title} = req.body

    const findTodo = await todosModel.findOne({title:title})

    if(findTodo){ //checking for Duplicated Todo 
        return res.status(404).json({massage: 'can not add this todo its already there'})
  
    }

    if(!title){ // check the request body before inserting the todo 
        return res.status(401).json({massage: 'Some Thing Went Wrong Can Not Add Todo To the List'})
    }

    const newTodo = {// create todo obj to database
        title,
    }

    const todoResult = await todosModel.create(newTodo)

    if(!todoResult){
        return res.status(400).json({massage: 'Can Not Create New Todo'})
    }

    res.status(200).json({newTodo: todoResult})

})




// @name updateTodo
// @method PUT
// @desc update Todo from database

const updateTodo = asyncHandler(async(req,res) => {
    const todoData = req.body

    const findTodoByID = await todosModel.findById(todoData.id)
 
    if(!findTodoByID){ // checking if the todo in the database
     return res.status(400).json({massage: 'can not find this todo'})
    }

    const updatedTodo = await todosModel.findOneAndUpdate(todoData.id,{...todoData},{returnOriginal:false})

    if(!todoData.title && !todoData.completed) return res.status(400).json({massage: "Can not update todo"})

    if(updateTodo){
        res.status(200).json({massage:'todo has updated succesfully',updatedTodo:updatedTodo})
    }

})





// @name deleteTodo
// @method DELETE
// @desc DELETE todo from database

const deleteTodo = asyncHandler(async(req,res) => {
   const {id} = req.body

   const findTodoByID = await todosModel.findById(id)

   if(!findTodoByID){ // checking if the todo in the database
    res.status(400).json({massage: 'can not find this todo'})
   }

   const deletedOne = await todosModel.deleteOne(findTodoByID)
    
   res.status(200).json({massage:`You Have Been Deleted Todo with ID ${id}`})

})

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
}