import nodemailer from "nodemailer"

const mail=()=>{
 let mailtransport= nodemailer.createTransport({
  service:'gmail',
  auth:{
   user:"madhuudhaya22@gmail.com",
   pass:"avni fzsf yeke pilk"
  }
 })
  let details={
   from:"madhuudhaya22@gmail.com",
   to:"madhuudhaya22@gmail.com",
   subject:"login req",
   text:"your login successfully"
  }
  mailtransport.sendMail(details,(err)=>{
   if(err){
    console.log("mail not send");
   }else{
    console.log("mail send successfully");
   }
  })
 

}
export default mail;
