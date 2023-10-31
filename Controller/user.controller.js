import user1 from "../Model/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import mail from "../Service/nodemailer.js"

import nodemailer from "nodemailer"

export const userRegister=async(req,res)=>{    
 try {
  const {username,email,password}=req.body
  const hashpassword=await bcrypt.hash(password,10)
  const newUser=new user1({username,email, password:hashpassword})
  await newUser.save()
  if(!newUser){
   return res.status(404).json({message:"User not register"})
  }
  return res.status(200).json({message:"successfully register",data:newUser})
 } catch (error) {
  console.error(error);
 }               

}


export const userlogin=async(req,res)=>{
 const {email,password}=req.body
 const user=await user1.findOne({email})

 if(!user){
  return  res.status(404).json({message:"not found"})
 }
 const passwordmatch=await bcrypt.compare(password,user.password)
 if(!passwordmatch){
  return res.status(401).json({message:"not found"})
 }
 const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
 mail();

  return res.status(200).json({message:"login successfull",Data:token})
}
export const getuser=async(req,res)=>{
 try {
  const userId =req.user._id
  const user= await user1.findById(userId)
 
if(!user){
  return res.status(200).json({error:"not found"})

}

 return res.status(200).json(user)


 } catch (error) {
  console.error(error);
  return res.status(500).json({messaage:"error found"})
 }
}




export const resetpassword =async(req,res)=>{
  const {email}=req.body
  const user =await user1.findOne({email})
  if(!user){
    return res.status(404).json({message:"User not found"})
  }
  const token=Math.random().toString(36).slice(-8)
   user.resetpasswordToken=token;
   user.resetpasswordExpires=Date.now()+360000;
   await user.save()


 const transport= nodemailer.createTransport({
  service:'gmail',
  auth:{
   user:"madhuudhaya22@gmail.com",
   pass:"avni fzsf yeke pilk"
  }
 });
  const details={
   from:"madhuudhaya22@gmail.com",
   to:user.email,
   subject:"reset password request",
   text:`your reset password link is here ${token}`
  }
  transport.sendMail(details,(err,info)=>{
   if(err){
    console.log("mail not send");
return res.status(200).json({ message: "Reset password email sent successfully" });

   }else{
    console.log("mail send successfully"+ info.response);
return res.status(200).json({ message: "Reset password email sent successfully" });

   }
  })
 

}




