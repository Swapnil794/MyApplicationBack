const express=require('express');
var router=express.Router();
const {getUserById,getUser,updateUser,orderPurchaseList}=require("../controllers/user");
const {isAuthenticated,isAdmin,issignedIn}=require("../controllers/auth");
// router params
router.param("userId",getUserById);
router.get("/user/:userId",issignedIn,isAuthenticated,getUser);
router.put("/user/:userId",issignedIn,isAuthenticated,updateUser);
router.put("/orders/user/:userId",issignedIn,isAuthenticated,orderPurchaseList);
module.exports=router;
