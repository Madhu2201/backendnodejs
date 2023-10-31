import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const authmiddleware=(req,res,next)=>{
 try{
 const token =req.header('Authorization')
 if(!token){
  return res.status(200).json({error:"token missing"})
 }
 
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  req.user=decoded

  console.log("decoded",decoded);
 console.log("req.user",req.user); 
 next();
 } catch (error) {
  console.error(error);
  return res.status(500).json({message:"error"})
 }
}

export default authmiddleware;
