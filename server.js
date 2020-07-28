const express = require('express');
const dbConnect = require('./config/db');

//db connection
dbConnect();

const app = express();

//define routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));