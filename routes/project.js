const express=require('express');
const route=express.Router();
const projectController=require('../controllers/projectController');


route.post('/create',projectController.create);

route.get('/delete/:id',projectController.delete);

route.get('/issues/:id', projectController.issues);

route.post('/issue/create/:id',projectController.createNewIssue);

route.get('/issues/load/:id', projectController.load);

route.get('/issues/delete/:issueId/:projectId', projectController.deleteIssue);


module.exports=route;