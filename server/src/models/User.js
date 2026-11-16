import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},passwordHash:{type:String,required:true},avatar:{type:String,default:''},timezone:{type:String,default:'Asia/Kolkata'},plan:{type:String,default:'free'},preferences:{approvalMode:{type:String,enum:['always','auto'],default:'always'},defaultBrandVoice:String}},{timestamps:true});
export default mongoose.model('User',schema);
