const express= require('express');
const app= express();
const port= 8000;

const db=require('./config/mongoose');

const route=require('./routes/index');


app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use('/',route);


app.set('view engine','ejs');
app.set('views', './views');


app.listen(port,function(err){
    if(err){
        console.log("There is some error in starting the server ",err);
        return;}
    console.log(`Server up and running at port ${port}`);    
});
