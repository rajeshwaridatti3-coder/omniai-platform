import mongoose from 'mongoose';
const schema=new mongoose.Schema({jti:{type:String,required:true,unique:true},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},provider:{type:String,required:true},expiresAt:{type:Date,required:true,index:{expires:0}}},{timestamps:true});
export default mongoose.model('OAuthState',schema);
