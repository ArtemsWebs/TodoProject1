const {Sequelize}=require("sequelize")

enum sequlizeConst{
  "dbName"="Todo1",
  "userName"="postgres",
  "password"="admin",
  "host"="localhost",
  "port"=5432
}


module.exports=new Sequelize(
  sequlizeConst["dbName"],
  sequlizeConst["userName"],
  sequlizeConst["password"],
  {
    dialect:sequlizeConst["userName"],
    host:sequlizeConst["host"],
    port:sequlizeConst["port"]
  }
)
