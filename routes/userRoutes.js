const express=require("express");
const {userRegister,userLogin,currentUser}=require("../controllers/userController");
const router=express.Router();

const validatToken = require("../middleware/validatToken");

router.post("/register",userRegister);

router.post("/login",userLogin);

router.get("/current",validatToken, currentUser);

module.exports=router;