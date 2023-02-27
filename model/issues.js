const mongoose=require('mongoose');

const issueSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true},
    label:{
        type:String,
    },
    assigned:{
        type:String,
    },
    author:{
        type:String
    },
    status:{
        type:String,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    }   
},
{
    timestamps:true
}

)

const issues=mongoose.model('issue',issueSchema);
module.exports=issues;