const mysql = require("mysql")

const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(function (err) {
    if (err) throw console.warn("NÃO CONECTOU COM O BANCO ", err)
    console.log("Conectado com o banco, USUARIO OK")
})

exports.get = ((req, res) => {
    db.query("SELECT * FROM user",
        function (err, rows) {
            if (!err) {
                res.send({ data: rows })
            } else {
                res.status(400).send({ message: "Erro ao fazer a consulta" }, err)
            }
        }
    )
})

exports.post = async (data, call) => {

    const user = {
        login: data.login,
        password: data.password,
        email: data.email
    }

    const values = user

    const query = `INSERT INTO user (login,password,email)
                VALUES('${user.login}','${user.password}','${user.email}')`

    db.query(query, values, function (err, rows) {

        console.warn("OLH eu aqui dentro", err, rows)
        if (!err)
            return call(rows)


        return call(err)
    })
}




// const myMock = [{
//     name: "Lucas dias",
//     password: "Lucas2906"
// }]