const mongoose=require("mongooose");
const user = require("./user");
const product = require("./product");
const {Objectid}=mongoose.Schema
const productcartSchema=new mongooose.Schema
(
    {
        product:
        {
            type:Objectid,
            ref:product
        },
        name:String,
        count:Number,
        price:Number
    }
);
const  productcart=mongoose.model("productcart",productcartSchema);
const orderSchema= new mongoose.Schema
(
    {
        Products:[productcartSchema],
        transaction_id:{},
        amount:{type:Number},
        adress:String,
        update:Date,
        user:
        {
            type:Objectid,
            ref:"User"

        }

    },
    {timestamp:true}
);
const order=mongoose.model("Order",orderSchema);
module.exports={order,productcart};