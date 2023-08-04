let express = require("express")
let app = express()
let route = require("./route")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route.app)




app.listen(3004, () => { console.log("connected") })