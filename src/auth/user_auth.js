 const jwt = require("jsonwebtoken")

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.PRIVATE_KEY, { expiresIn: 3600 })
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, process.env.PRIVATE_KEY)
    return data
}

exports.authorize = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers.authorization

    if(!token){
        res.status(401).json({message:"Acesso Restrito"})
    } else{
        jwt.verify(token,process.env.PRIVATE_KEY, function(err,decoded){
            if(err) {
                res.status(401).json({message:"Token inválido"})
            } else{
                next()
            }
            
        })
    }
}