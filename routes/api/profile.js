const  express = require('express')
const router = express.Router();

/*
*@Route GET api/profile
*@description test profile route
*@access public
*/

router.get('/', (req, res)=>{res.send('profile')})


module.exports=router;