const Router=require('express')
const router=new Router()
const funcObj=require('../controller/todoControl')

router.delete('/delete_todo/:id',funcObj.deleteTodo)
router.delete('/delete_all',funcObj.deleteAll)
router.post('/add_todo',funcObj.addTodo)
router.put('/update_todo',funcObj.updateTodo)
router.get('/get_todo', funcObj.getTodo)

module.exports=router
