import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},provider:{type:String,required:true},accountId:String,accountName:String,accessTokenEncrypted:String,refreshTokenEncrypted:String,tokenExpiresAt:Date,scopes:[String],metadata:mongoose.Schema.Types.Mixed,status:{type:String,default:'connected'},lastError:String},{timestamps:true}); schema.index({user:1,provider:1,accountId:1},{unique:true,sparse:true});
export default mongoose.model('Connection',schema);
