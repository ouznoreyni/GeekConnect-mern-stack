const  express = require('express')
const router = express.Router();

/*
*@Route GET api/users
*@description test users route
*@access public
*/
router.get('/', (req, res)=>{res.send('users')})


module.exports=router;