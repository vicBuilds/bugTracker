const project=require('../model/project');

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