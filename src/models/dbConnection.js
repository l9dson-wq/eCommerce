const mongoose = require('mongoose');

const URL = 'mongodb://0.0.0.0:27017/Testing';

const connectDB = async () => {
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected');

        //models initialization
        require('./modelsInitialization');
    }catch(err){
        console.log('There was an error trying to connect to the database:', err);
    }
}

module.exports = connectDB;