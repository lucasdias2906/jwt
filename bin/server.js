const express = require('express')
const app = require("../app")
const server = express()

server.use(app)
const port = process.env.PORT || 3002
server.listen(port,function(){
    console.warn("O SERVIDOR TA RODANDO NA PORTA ", port)
})