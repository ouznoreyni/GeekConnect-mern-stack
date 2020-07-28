const  express = require('express')
const router = express.Router();

/*
*@Route GET api/auth
*@description test auth route
*@access public
*/

router.get('/', (req, res)=>{res.send('Auth')})


module.exports=router;