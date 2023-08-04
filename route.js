let express = require("express")
let app = express()
let products = require("./controler/productControler")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/product/add", products.add)
app.put("/product/update", products.update)
app.get("/product/view", products.view)
app.delete("/product/delete", products.dlt)

module.exports = { app }