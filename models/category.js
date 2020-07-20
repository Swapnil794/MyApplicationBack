const mongoose=require("mongoose");
const categorySchema= new mongoose.Schema(
    {
        category:
        {
            type:String,
            require:true,
            unique:true,
            trim:true,
            maxlenght:32
        }
    },
    {
        timestamp:true
    }
);

module.exports=mongoose.model("category",categorySchema);