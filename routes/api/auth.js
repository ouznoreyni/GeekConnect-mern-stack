const  express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User')
/*
*@Route GET api/auth
*@description test auth route
*@access public
*/

router.get('/', auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password') 
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur Interne')
    }
})


module.exports=router;