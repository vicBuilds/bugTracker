const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/issueTracker');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'There is some error'));

db.once('open', ()=>{console.log('Your db is up and running')})

module.exports=db;