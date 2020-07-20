const mongoose=require("mongoose");
const { model } = require("./user");
const {Objectid}=mongoose.Schema;
const category=require("./category")
const productSchema= new mongoose.Schema
(
    {
        name:
        {
            type:String,
            require:true,
            trim:true,
            unique:true,
            maxlenght:32
        },
        description:
        {
            type:String,
            require:true,
            trim:true,
            maxlength:2000
        },
        price:
        {
            type:Number,
            trim:true,
            maxlength:32
        },
        category:
        {
            type:Objectid,
            ref:"category",
            required:true
        },
        stock:
        {
            type:Number,
        },
        sold:
        {
            type:Number,
            default:0
                
        },
        photo:
        {
            data:Buffer,
            contenttype:String
        }
    },
    {
        timestamp:true
    }
);

module.exports=mongoose.model("product",productSchema);