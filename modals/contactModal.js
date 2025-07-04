const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        required: [true,"Please enter the email"]
    },
    phone:{
        type:String,
        required:[true,"Please enter the contact number"]
    }


}
,{
    timestamps:true
})



module.exports=mongoose.model("Contact",contactSchema);