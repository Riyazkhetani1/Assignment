let { Sequelize, Model, DataTypes } = require("sequelize")
let sequelize = new Sequelize("mysql://root:@localhost/demo1")
sequelize.authenticate().then(() => {
    console.log("Connected to db")
}).catch((error) => { console.log(error) })

module.exports = { sequelize, Model, DataTypes }