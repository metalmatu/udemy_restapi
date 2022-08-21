require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")
const app = express()
const morganBody = require("morgan-body")
const swaggerUI = require("swagger-ui-express")
const openApiConfiguration = require("./docs/swagger")

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3000
/**
 * Definir ruta de Documentación
 */
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfiguration))

morganBody(app, {

})

/*
 Aqui invocamos las rutas
*/

app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`tu app esta lista por http://localhost:${port}`)
})

dbConnect()