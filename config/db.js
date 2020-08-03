const mongoose = require('mongoose');
const config =  require('config');
const db = config.get('mongoURI');

const dbConnect = async()=>{
    try {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        mongoose.connect(db)
        console.log('Mongo db connected ');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports= dbConnect;