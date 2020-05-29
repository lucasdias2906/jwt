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
    console.log("Conectado com o banco, LOGGED OK")
})

exports.logged = (data, call) => {

    const user = {
        login: data.login,
        password: data.password
    }

    const values = user

    const query = `SELECT*FROM user WHERE login = '${user.login}' AND password = '${user.password}'`

    db.query(query, values, function (err, rows) {
        if (!err)
            return call(rows)
        return call(err)

    })
}