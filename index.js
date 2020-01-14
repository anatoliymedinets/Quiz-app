const app = require('./app')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const InitializerDB = require('./helpers/initializerDB')

const port = process.env.port || 5000

async function start(){
    try{
        await mongoose.connect(keys.mongoLocalURI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
          })
        app.listen(port, ()=>{
            console.log(`Server run on port ${port}`);
            InitializerDB.initialize();
        })
    }catch(ex){
        console.log(ex)
    }
}

start()

