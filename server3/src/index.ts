
const express=require("express")
const sequlize=require('./db')
const cors=require('cors')
const router1=require('./routes/todoRouter')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


const app=express()
const port: number=5003
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use(express.json())

app.use('/todo',router1)

const  startDB=async ()=>{
  try{
    await sequlize.authenticate()
    await sequlize.sync()
    app.listen(port,()=>console.log(`Сервер стартовал: на хосте ${port}`))
  }
  catch (e){
    console.log(`Ошибка: ${e}`)
  }

}
startDB()

module.exports={}
