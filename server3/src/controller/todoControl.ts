import { Todo, TodoId, TodoAdd, BodysAdd, DeleteTodo, UpTodo, AddTodo } from '../Type/Types';
const todoModel=require('../models/Todos')

const getTodo=async (req:any,res:any):Promise<Todo[]>=>{
  const result: Todo[]=await todoModel.findAll({ attributes: ['id', 'content']})
  return res.json(result)
}
const  deleteTodo: DeleteTodo=async (req,res):Promise<number|any>=>{
  const id:number=Number(req.url.split('/').slice(-1))
  await todoModel.destroy({where:{id:id}, returning: true,plan:true}).then((result)=>{
    return res.json(id)
  })

}
const deleteAll:DeleteTodo=async (req,res)=>{
  const result=await todoModel.destroy({truncate:true})
  return res.json(result)
}
const updateTodo:UpTodo= async (req,res:any)=>{
  const [id,content]=[req.body.id,req.body.content]
  await todoModel.update({content:content}, {where:{id:id},returning: true,plan:true}).then((result)=>{
    return res.json(result[1][0])
  })
}
const addTodo:AddTodo=async (req,res:any)=>{
  const todo: BodysAdd=req.body
  const result:Todo=await todoModel.create(todo)
  return res.json(result)
}

module.exports={
  getTodo:getTodo,
  deleteTodo:deleteTodo,
  deleteAll:deleteAll,
  updateTodo:updateTodo,
  addTodo:addTodo
}
