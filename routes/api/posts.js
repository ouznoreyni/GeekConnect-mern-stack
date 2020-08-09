const express = require('express');
const router = express.Router();

/*
 *@Route GET api/posts
 *@description test posts route
 *@access public
 */

router.get('/', (req, res) => {
  res.send('posts');
});

module.exports = router;
