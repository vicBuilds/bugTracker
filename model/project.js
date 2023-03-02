const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    manager:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },

    issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'issues'
    }]},

    {
        timestamps:true
    }

)

const project=mongoose.model('project',projectSchema);
module.exports=project;