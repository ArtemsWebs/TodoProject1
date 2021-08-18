const sequelize=require('../db')
const {DataTypes}=require('sequelize')

const Todo = sequelize.define('Todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content:DataTypes.STRING
})
module.exports=Todo
