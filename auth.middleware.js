const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    try{
        //{body: {},params: {}}
        const token = req.header('Auth')
        if(!token) return res.status(404).send("Please provide a token")
    
        const object = jwt.verify(token,process.env.JWT) //{id: jiauiaiufaiufa}
        req.user = object
        //{body: {},params: {},user: {id: jiauiaiufaiufa}}
        next()
    }
    catch(err){
        return res.status(400).send(err.message)
    }


}