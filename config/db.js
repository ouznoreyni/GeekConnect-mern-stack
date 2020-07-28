const mongoose = require('mongoose');
const config =  require('config');
const db = config.get('mongoURI');

const dbConnect = async()=>{
    try {
        mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Mongo db connected ');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports= dbConnect;