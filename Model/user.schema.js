import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
 username:String,
 email:String,
 password:String,
 resetpasswordToken:String,
 resetpasswordExpires:Date

})
const user1= mongoose.model("user1",userSchema)
export default user1;
