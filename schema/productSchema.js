let { sequelize, Model, DataTypes } = require("../init/dbconfig")

class Product extends Model { }
Product.init({
    id: {
        type: DataTypes.INTEGER,
        allownull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: "product", modelName: "Product", sequelize })

module.exports = { Product }