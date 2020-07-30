const  express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router();

/*
*@Route POST api/users
*@description Register User
*@access public
*/
router.post('/',
    [
        check('name', 'le nom est obligatoire').not().isEmpty(),
        check('email', 'Entrer une adresse email valide').isEmail(),
        check('password', 'le mot de passe doit minimum 6 caracteres').isLength({min:6})
    ], (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    res.send('users')
})


module.exports=router;