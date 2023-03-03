const express=require('express');
const route=express.Router();
const projectController=require('../controllers/projectController');

// Route to Create a post
route.post('/create',projectController.create);

// Route to Delete a post
route.get('/delete/:id',projectController.delete);

// Route for navigating to the issues page
route.get('/issues/:id', projectController.issues);

// Route to Create a new issue
route.post('/issue/create/:id',projectController.createNewIssue);

// Loading a issue in ajax
route.get('/issues/load/:id', projectController.load);

// Route to Delete a issue iwth issue id and project id in the request params
route.get('/issues/delete/:issueId/:projectId', projectController.deleteIssue);


module.exports=route;