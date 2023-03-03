const project=require('../model/project');
const issue=require('../model/issues');


// Global function to handle all errors

function globalerror(err){
    console.log("The error is  ",err);
}


// HomePage for the Issue Tracker preload all the project and render the home page

module.exports.home=async function(req,res){

    try{
        let all_list=await project.find({}).sort('-createdAt');
        // console.log(all_list.length);
        return res.render('home',{
            project:all_list
        });
    }catch(err){
        globalerror(err);
        return;
    }

}

// Creating a new Project trim for extra spaces

module.exports.create=async function(req,res){
    try{
    let newProject=await project.create({
        name:req.body.name.trim(),
        manager:req.body.manager.trim(),
        description:req.body.description.trim(),
    })
    return res.redirect('back');

    }catch(err){
        globalerror(err);
        return;}

}


// Loading the Issues page of a Particular Project

module.exports.issues= async function(req,res){
  try{  
    let item=await project.findById(req.params.id).populate('issues');

            let assigned=[];
            let label=[];
            for(let i of item.issues){
                label.push(i.label);
                assigned.push(i.assigned);
            }

        label=label.filter((item, 
            index) => label.indexOf(item) === index);

        assigned=assigned.filter((item, 
                index) => assigned.indexOf(item) === index); 

            // console.log(label);
            // console.log(assigned);      

            return res.render('issue',{
                project:item,
                label:label,
                assigned:assigned
            });
    }catch(err){
        globalerror(err);
    }
}


// Creating a New Issue, set the status as pending initially

module.exports.createNewIssue= async function(req,res){

    try{
            let projectitem=await project.findById(req.params.id);

        // console.log(req.body);

            // return res.send("Working on this");

            let newIssue= await issue.create({
                title: req.body.title,
                description:req.body.description,
                label:req.body.label,
                assigned:req.body.assigned,
                status:"Pending",
                project:projectitem._id
        })
            
            await projectitem.issues.push(newIssue);
            await projectitem.save();

        return res.redirect('back');

    }catch(err){
        globalerror(err);
        return;
    }


}

// Deleting a Post

module.exports.delete=async function(req,res){
    let id=req.params.id;
    
    let project_many=await project.findByIdAndDelete(id);
    
    let issues=await issue.deleteMany({project:id});


    return res.redirect('back');
}


// Handle the Ajax request from Front End (from the Issues page) and send all the date relatinf to the Project
module.exports.load=async function(req,res){
    let id= req.params.id;
    let pro= await project.findById(id).populate('issues');

    return res.status(200).json({
        message: pro.issues,
    })
}

/*
Deleting a Issue, steps required:
1. Get the IssueId and ProjectId in Request params
2. Delete the Issue
3. Pull the Issue from the array of Issues in Project Page
4. Redirect the User back
*/

module.exports.deleteIssue= async function(req,res){
    const{issueId,projectId}=req.params;
     try{
        await issue.findByIdAndDelete(req.params.issueId);

        let projectReq=await project.findById(req.params.projectId);
        
        // Pull the Issue from the array of Issues in Project Page
        await projectReq.updateOne({$pull: {issues: req.params.issueId}}) 

        await projectReq.save();

        return res.redirect('back');
        }
     catch(err){
        globalerror(err);
     }
   
}
