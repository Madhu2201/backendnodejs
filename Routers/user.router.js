import express from "express";
import {userRegister,userlogin,getuser,resetpassword} from "../Controller/user.controller.js"
import authMiddleware from '../middleware/auth.middleware.js'
 const router=express.Router();
 router.post('/userRegister',userRegister)
 router.post('/userlogin',userlogin)
 router.get('/getuser',authMiddleware,getuser)
 router.post('/resetpassword',resetpassword)
 export default  router;