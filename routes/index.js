const express=require('express');
const route=express.Router();
const projectController=require('../controllers/projectController');

route.get('/', projectController.home);

route.use('/project', require('./project'));


module.exports=route;