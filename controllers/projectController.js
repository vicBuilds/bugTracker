const project=require('../model/project');
const issue=require('../model/issues');

function globalerror(err){
    console.log("The error is  ",err);
}

module.exports.home=async function(req,res){
    let all_list=await project.find({}).sort('-createdAt');
    return res.render('home',{
        project:all_list
    });
}

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

module.exports.issues= async function(req,res){
  let item=await project.findById(req.params.id).populate('issues');

    //return res.redirect('back');
    // console.log(item.issues);
    // for(let i of item.issues){
    //     console.log(i.title);
    //     console.log(i.label);
        

    
        //    item.populate('issues');
        //    return res.render('issue',{
        //     post:item,
        //    });
        // console.log(item);
        // return res.redirect('back');
        // console.log(item.issues[0]);

        let assigned=[];
        let label=[];
        for(let i of item.issues){
            label.push(i.label);
            assigned.push(i.assigned);
        }

    //    console.log(label);
    //    console.log(assigned); 

    //  Remove the Duplicates from the Label and Assigned Array

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
}

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
    console.log("There is some error in creting a issue", err);
    return res.redirect('back');
}


}

module.exports.delete=async function(req,res){
    let id=req.params.id;
    let result_issue_delete=await issue.deleteMany({
        project_id:id
    });

    let project_many=await project.findByIdAndDelete(id);

    return res.redirect('back');
}

module.exports.load=async function(req,res){
    let id= req.params.id;
    let pro= await project.findById(id).populate('issues');

    return res.status(200).json({
        message: pro.issues,
    })
}

