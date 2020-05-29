const { post } = require("../controller/user")
const controllerUser = require("../controller/user")
const { logged } = require("../controller/logged")
const md5 = require("md5")
const { sign, verify } = require("jsonwebtoken")
const authUser = require("../auth/user_auth")

exports.postUser = (req, res, err) => {
    const user = req.body
    if (!user.password) return err

    user.password = md5(user.password, process.env.PRIVATE_KEY)

    console.warn("SENHA CRIPTOGRAFADA ", user.password)

    post(user, (sucess) => {
        console.log(sucess)
        if (!sucess) {
            console.warn("NÃO CONSIGUIU CONECTAR COM A ", process.env.PORT)
            return res.status(500).json({ message: "Erro Post" })
        }
        console.log("Cadastro Feito")
        return res.status(200).json({ mensagem: "Cadastro feito" })
    })
},


    exports.login = (req, res, err) => {
        const { login, password } = req.body

        if (!login && !password) return err

        const data = {
            login, password
        }

        logged(data, (sucess) => {

            if (!sucess) {
                return res.status(400).json({ message: "Login ou password invalido, verifique" })
            }

            const result = md5(password, data.password)
            if (result) {
                data.password = undefined;
                const jsontoken = sign({ login: data.login}, process.env.PRIVATE_KEY, {
                    expiresIn: 3600
                })

                return res.status(200).json({
                    message: "Logado com Sucesso",
                    token: jsontoken,
                    decrypted: verify(jsontoken, process.env.PRIVATE_KEY),
                    data: data
                })
            } else {
                console.log("ERROOOOO", err)
                return err
            }
        })

        let cryptPassword = md5(password, process.env.PRIVATE_KEY)
        console.log("SENHA CRIPT LOGIN ", cryptPassword)
    }

exports.refreshToken = async (req, res, err) => {
    try {
        const token = req.body.token || req.query.token || req.headers.authorization
        const data = await authUser.decodeToken(token)
        console.log("DATAAAAAAAAA", data)

        // const {login} = req.body
        // console.log(login)
        
        

        if (!data.login) {
            res.status(404).send({ message: "Login não encontrado" })
            return err;
        }

        const tokenData = await authUser.generateToken({
            login: data.login,

        })

        res.status(201).send({
            token: tokenData,
            data: {
                login: data.login,
                // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImpwIiwiaWF0IjoxNTkwNjg4Njk5LCJleHAiOjE1OTA2OTIyOTl9.hT-KkGlcBFv2i__I8skddctZNtd29YsY_QcP4gLLgGM
                // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImpwIiwiaWF0IjoxNTkwNjg4Njk5LCJleHAiOjE1OTA2OTIyOTl9.hT-KkGlcBFv2i__I8skddctZNtd29YsY_QcP4gLLgGM

            }
        })

    } catch (error) {
        console.warn("ERRO AUTH ", error)
        res.status(500).send({ message: "Falha ao processar a requisão" })

    }
}

