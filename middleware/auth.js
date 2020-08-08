const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next)=>{
    //Get token from header
    const token = req.header('x-auth-token');
    //check if not token
    if(!token){
        return res.status(401).json({msg:"Token n'existe pas.Accès non autorise"})
    }
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'Token invalide'})
    }
}