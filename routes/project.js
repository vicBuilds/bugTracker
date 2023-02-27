const express=require('express');
const route=express.Router();
const projectController=require('../controllers/projectController');


route.post('/create',projectController.create);



module.exports=route;